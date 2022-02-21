include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.deps: lib/cucumber/messages.dtos.rb lib/cucumber/messages.deserializers.rb

lib/cucumber/messages.dtos.rb: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/ruby.rb.erb ../jsonschema/scripts/templates/ruby.enum.rb.erb
	ruby ../jsonschema/scripts/codegen.rb Ruby ../jsonschema ruby.rb.erb > $@
	ruby ../jsonschema/scripts/codegen.rb Ruby ../jsonschema ruby.enum.rb.erb >> $@

lib/cucumber/messages.deserializers.rb: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/ruby_deserializers.rb.erb
	ruby ../jsonschema/scripts/codegen.rb Ruby ../jsonschema ruby_deserializers.rb.erb > $@

clean:
	rm -f lib/cucumber/messages.dtos.rb
	rm -f lib/cucumber/messages.deserializers.rb
