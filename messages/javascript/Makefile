include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.codegen: src/messages.ts

src/messages.ts: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb
	ruby ../jsonschema/scripts/codegen.rb TypeScript ../jsonschema > $@

clean:
	rm -rf dist src/types/*.ts
