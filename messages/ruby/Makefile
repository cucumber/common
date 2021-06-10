include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.deps: lib/cucumber/messages.dtos.rb

lib/cucumber/messages.dtos.rb: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/ruby.rb.erb ../jsonschema/scripts/templates/ruby.enum.rb.erb
	ruby ../jsonschema/scripts/codegen.rb Ruby ../jsonschema > $@

clean:
	rm -f lib/cucumber/messages.dtos.rb
