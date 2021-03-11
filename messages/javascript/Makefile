include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.jsonschema")

.codegen: src/messages.ts

src/messages.ts: $(JSONSCHEMAS)
	ruby scripts/codegen.rb ../jsonschema > $@

clean:
	rm -rf dist src/types/*.ts
