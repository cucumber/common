include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")
LOCAL_SCHEMAS = $(patsubst ../jsonschema/%, schema/%, $(JSONSCHEMAS))

.codegen: src/messages.ts src/version.ts $(LOCAL_SCHEMAS)

schema/%.json: ../jsonschema/%.json
	cp $< $@

src/messages.ts: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/typescript.ts.erb ../jsonschema/scripts/templates/typescript.enum.ts.erb
	ruby ../jsonschema/scripts/codegen.rb TypeScript ../jsonschema typescript.ts.erb > $@
	ruby ../jsonschema/scripts/codegen.rb TypeScript ../jsonschema typescript.enum.ts.erb >> $@

src/version.ts: package.json
	npm version --json | jq $$'"// This file is generated using `make src/version.ts` or `make .codegen`\nexport const version = \'" + (."@cucumber/messages") + "\'"' --raw-output > $@

clean:
	rm -f src/messages.ts src/version.ts
