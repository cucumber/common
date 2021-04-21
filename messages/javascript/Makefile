include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.codegen: src/messages.ts

src/messages.ts: $(JSONSCHEMAS) scripts/codegen.rb
	ruby scripts/codegen.rb ../jsonschema > $@

clean:
	rm -rf dist src/types/*.ts
