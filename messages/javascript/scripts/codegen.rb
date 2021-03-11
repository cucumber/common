require 'json'
require 'erb'
require 'set'

class Codegen
  def initialize(paths, template, language_type_by_schema_type)
    @paths = paths
    @template = ERB.new(template)
    @language_type_by_schema_type = language_type_by_schema_type

    @schemas = {}
    @references = Hash.new { |hash, key| hash[key] = Set.new }

    @paths.each do |path|
      expanded_path = File.expand_path(path)
      schema = JSON.parse(File.read(path))
      add_schema(expanded_path, schema)
    end
  end

  def generate(destination)
    @schemas.each do |key, schema|
      typename = File.basename(key, '.jsonschema')

      referenced_types = @references[key]

      File.open("#{destination}/#{typename}.ts", 'wb') do |io|
        io.write @template.result(binding)
      end
    end
  end

  def add_schema(key, schema)
    @schemas[key] = schema
    (schema['definitions'] || {}).each do |name, subschema|
      subkey = "#{key}/#{name}"
      add_schema(subkey, subschema)
    end

    (schema['properties'] || {}).each do |name, subschema|
      referenced_type = reference_type_for(subschema, name)
      unless native_type?(referenced_type)
        @references[key] << referenced_type
      end
    end
  end

  def native_type?(type_name)
    @language_type_by_schema_type.values.include?(type_name)
  end

  def type_for(schema, name)
    type = schema['type']
    items = schema['items']
    ref = schema['$ref']
    if ref
      File.basename(schema['$ref'], '.jsonschema')
    elsif type
      if type == 'array'
        array_type_for(type_for(items, nil))
      else
        raise "No type mapping for JSONSchema type #{type}. Schema:\n#{JSON.pretty_generate(schema)}" unless @language_type_by_schema_type[type]
        @language_type_by_schema_type[type]
      end
    else
      # Inline schema (not supported)
      raise "Property #{name} did not define 'type' or '$ref'"
    end
  end

  def reference_type_for(schema, name)
    type = schema['type']
    items = schema['items']
    ref = schema['$ref']
    if ref
      File.basename(schema['$ref'], '.jsonschema')
    elsif type
      if type == 'array'
        type_for(items, nil)
      else
        raise "No type mapping for JSONSchema type #{type}. Schema:\n#{JSON.pretty_generate(schema)}" unless @language_type_by_schema_type[type]
        @language_type_by_schema_type[type]
      end
    else
      # Inline schema (not supported)
      raise "Property #{name} did not define 'type' or '$ref'"
    end
  end

  def array_type_for(type)
    "readonly #{type}[]"
  end
end

template = <<-EOF
<% referenced_types.each do |referenced_type| %>
import { <%= referenced_type %> } from "./<%= referenced_type %>"
<% end %>
export interface <%= typename %> {
  <% schema['properties'].each do |name, subschema| %>
    <%= name %>?: <%= type_for(subschema, name) %>
  <% end %>
}
EOF

language_type_by_schema_type = {
  'integer' => 'number',
  'string' => 'string',
  'boolean' => 'boolean',
}
path = ARGV[0]
paths = File.file?(path) ? [path] : Dir["#{ARGV[0]}/*.jsonschema"]
destination = ARGV[1]
codegen = Codegen.new(paths, template, language_type_by_schema_type)
codegen.generate(destination)
