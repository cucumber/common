require 'json'
require 'erb'
require 'set'

class Codegen
  def initialize(paths, template, language_type_by_schema_type)
    @paths = paths
    @template = ERB.new(template, nil, '-')
    @language_type_by_schema_type = language_type_by_schema_type

    @schemas = {}

    @paths.each do |path|
      expanded_path = File.expand_path(path)
      schema = JSON.parse(File.read(path))
      add_schema(expanded_path, schema)
    end
  end

  def generate
    STDOUT.write @template.result(binding)
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

  def default_value(property)
    if property['items']
      '[]'
    elsif property['type'] == 'string'
      if property['enum']
        "'#{property['enum'][0]}'"
      else
        "''"
      end
    elsif property['type'] == 'integer'
      "0"
    elsif property['type'] == 'boolean'
      "false"
    elsif property['$ref']
      type = type_for(property, '???')
      "new #{type}()"
    else
      raise "Cannot create default value for #{property.to_json}"
    end
  end

  def type_for(property, name)
    ref = property['$ref']
    type = property['type']
    items = property['items']
    enum = property['enum']
    if ref
      File.basename(property['$ref'], '.jsonschema')
    elsif type
      if type == 'array'
        array_type_for(type_for(items, nil))
      else
        raise "No type mapping for JSONSchema type #{type}. Schema:\n#{JSON.pretty_generate(property)}" unless @language_type_by_schema_type[type]
        if enum
          enum_type_for(enum)
        else
          @language_type_by_schema_type[type]
        end
      end
    else
      # Inline schema (not supported)
      raise "Property #{name} did not define 'type' or '$ref'"
    end
  end

  def enum_type_for(enum)
    enum.map { |value| "'#{value}'" }.join(' | ')
  end

  def array_type_for(type)
    "readonly #{type}[]"
  end
end

template = <<-EOF
import { Type } from 'class-transformer'
import 'reflect-metadata'

<% @schemas.each do |key, schema| -%>
export class <%= File.basename(key, '.jsonschema') %> {
<% schema['properties'].each do |name, property| -%>
<% ref = property['$ref'] || property['items'] && property['items']['$ref'] %>
<% if ref -%>
  @Type(() => <%= File.basename(ref, '.jsonschema') %>)
<% end -%>
<% if property['required'] -%>
  <%= name %>: <%= type_for(property, name) %> = <%= default_value(property) %>
<% else -%>
  <%= name %>?: <%= type_for(property, name) %>
<% end -%>
<% end -%>
}

<% end -%>
EOF

language_type_by_schema_type = {
  'integer' => 'number',
  'string' => 'string',
  'boolean' => 'boolean',
}
path = ARGV[0]
paths = File.file?(path) ? [path] : Dir["#{ARGV[0]}/*.jsonschema"]

codegen = Codegen.new(paths, template, language_type_by_schema_type)
codegen.generate
