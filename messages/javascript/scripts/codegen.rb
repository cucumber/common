require 'json'
require 'erb'

class Codegen
  def initialize(paths, template, types)
    @paths = paths
    @template = ERB.new(template)
    @types = types

    @schemas = {}
    @paths.each do |path|
      expanded_path = File.expand_path(path)
      schema = JSON.parse(File.read(path))
      add_schema(expanded_path, schema)
    end
  end

  def generate
    @schemas.each do |key, schema|
      typename = File.basename(key, '.jsonschema')
      puts "# #{typename}"
      puts @template.result(binding)
    end
  end

  def add_schema(key, schema)
    @schemas[key] = schema
    (schema['definitions'] || {}).each do |name, subschema|
      subkey = "#{key}/#{name}"
      add_schema(subkey, subschema)
    end
  end

  def type_for(value, name)
    type = value['type']
    items = value['items']
    ref = value['$ref']
    if ref
      File.basename(value['$ref'], '.jsonschema')
    elsif type
      if type == 'array'
        array_type_for(type_for(items, nil))
      else
        raise "No type mapping for JSONSchema type #{type}. Schema:\n#{JSON.pretty_generate(value)}" unless @types[type]
        @types[type]
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
export interface <%= typename %> {
  <% schema['properties'].each do |name, value| %>
    <%= name %>?: <%= type_for(value, name) %>
  <% end %>
}
EOF

types = {
  'integer' => 'number',
  'string' => 'string',
  'boolean' => 'boolean',
}
path = ARGV[0]
paths = File.file?(path) ? [path] : Dir["#{ARGV[0]}/*.jsonschema"]
codegen = Codegen.new(paths, template, types)
codegen.generate
