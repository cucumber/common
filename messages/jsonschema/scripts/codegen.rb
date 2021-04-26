require 'json'
require 'erb'
require 'set'

class Codegen
  def initialize(paths, template, enum_template, language_type_by_schema_type)
    @paths = paths
    @template = ERB.new(template, nil, '-')
    @enum_template = ERB.new(enum_template, nil, '-')
    @language_type_by_schema_type = language_type_by_schema_type

    @schemas = {}
    @enums = Set.new

    @paths.each do |path|
      expanded_path = File.expand_path(path)
      begin
        schema = JSON.parse(File.read(path))
        add_schema(expanded_path, schema)
      rescue => e
        e.message << "\npath: #{path}"
        raise e
      end
    end
  end

  def generate
    STDOUT.write @template.result(binding)
    @enums.to_a.sort{|a,b| a[:name] <=> b[:name]}.each do |enum|
      STDOUT.write @enum_template.result(binding)
    end
  end

  def add_schema(key, schema)
    @schemas[key] = schema
    (schema['definitions'] || {}).each do |name, subschema|
      subkey = "#{key}/#{name}"
      add_schema(subkey, subschema)
    end
  end

  def native_type?(type_name)
    @language_type_by_schema_type.values.include?(type_name)
  end

  def default_value(parent_type_name, property_name, property)
    if property['items']
      '[]'
    elsif property['type'] == 'string'
      if property['enum']
        enum_type_name = type_for(parent_type_name, property_name, property)
        "#{enum_type_name}.#{property['enum'][0]}"
      else
        "''"
      end
    elsif property['type'] == 'integer'
      "0"
    elsif property['type'] == 'boolean'
      "false"
    elsif property['$ref']
      type = type_for(parent_type_name, nil, property)
      "new #{type}()"
    else
      raise "Cannot create default value for #{parent_type_name}##{property.to_json}"
    end
  end

  def type_for(parent_type_name, property_name, property)
    ref = property['$ref']
    type = property['type']
    items = property['items']
    enum = property['enum']
    if ref
      class_name(property['$ref'])
    elsif type
      if type == 'array'
        array_type_for(type_for(parent_type_name, nil, items))
      else
        raise "No type mapping for JSONSchema type #{type}. Schema:\n#{JSON.pretty_generate(property)}" unless @language_type_by_schema_type[type]
        if enum
          enum_type_name = "#{parent_type_name}#{capitalize(property_name)}"
          @enums.add({ name: enum_type_name, values: enum })
          enum_type_name
        else
          @language_type_by_schema_type[type]
        end
      end
    else
      # Inline schema (not supported)
      raise "Property #{name} did not define 'type' or '$ref'"
    end
  end

  def class_name(ref)
    File.basename(ref, '.json')
  end

  def capitalize(s)
    s.sub(/./,&:upcase)
  end
end

class TypeScript < Codegen
  def initialize(paths)
    template = <<-EOF
import { Type } from 'class-transformer'
import 'reflect-metadata'

<% @schemas.sort.each do |key, schema| -%>
export class <%= class_name(key) %> {
<% schema['properties'].each do |property_name, property| -%>
<% ref = property['$ref'] || property['items'] && property['items']['$ref'] %>
<% if ref -%>
  @Type(() => <%= class_name(ref) %>)
<% end -%>
<% if (schema['required'] || []).index(property_name) -%>
  <%= property_name %>: <%= type_for(class_name(key), property_name, property) %> = <%= default_value(class_name(key), property_name, property) %>
<% else -%>
  <%= property_name %>?: <%= type_for(class_name(key), property_name, property) %>
<% end -%>
<% end -%>
}

<% end -%>
EOF

    enum_template = <<-EOF
export enum <%= enum[:name] %> {
<% enum[:values].each do |value| -%>
  <%= value %> = '<%= value %>',
<% end -%>
}

EOF

    language_type_by_schema_type = {
      'integer' => 'number',
      'string' => 'string',
      'boolean' => 'boolean',
    }
    super(paths, template, enum_template, language_type_by_schema_type)
  end

  def array_type_for(type_name)
    "readonly #{type_name}[]"
  end
end

class Go < Codegen
  def initialize(paths)
    template = <<-EOF
package messages

<% @schemas.sort.each do |key, schema| -%>
type <%= class_name(key) %> struct {
<% schema['properties'].each do |property_name, property| -%>
<%
type_name = type_for(class_name(key), property_name, property)
star = @language_type_by_schema_type.values.index(type_name) ? '' : '*'
-%>
  <%= capitalize(property_name) %> <%= star %><%= type_name %> `json:"<%= property_name %>"`
<% end -%>
}

<% end -%>
EOF

    enum_template = <<-EOF
type <%= enum[:name] %> string
const(
<% enum[:values].each do |value| -%>
  <%= value %> <%= enum[:name] %> = "<%= value %>"
<% end -%>
)

EOF

    language_type_by_schema_type = {
      'integer' => 'int64',
      'string' => 'string',
      'boolean' => 'bool',
    }
    super(paths, template, enum_template, language_type_by_schema_type)
  end

  def array_type_for(type_name)
    "[]#{type_name}"
  end
end

clazz = Object.const_get(ARGV[0])
path = ARGV[1]
paths = File.file?(path) ? [path] : Dir["#{path}/*.json"]
codegen = clazz.new(paths)
codegen.generate
