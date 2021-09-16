include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.codegen: src/messages.ts src/version.ts

src/messages.ts: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb
	ruby ../jsonschema/scripts/codegen.rb TypeScript ../jsonschema > $@

src/version.ts: package.json
	npm version --json | jq $$'"// This file is generated using `make src/version.ts` or `make .codegen`\nexport const version = \'" + (."@cucumber/messages") + "\'"' --raw-output > $@

clean:
	rm -rf src/types/*.ts
