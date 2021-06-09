include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.codegen: lib/cucumber/messages.dtos.rb

lib/cucumber/messages.dtos.rb: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb
	ruby ../jsonschema/scripts/codegen.rb Ruby ../jsonschema > $@

clean:
	rm -f lib/cucumber/messages.dtos.rb
