include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.jsonschema")
TS_TYPE_FILES = $(patsubst ../jsonschema/%.jsonschema,src/types/%.d.ts,$(JSONSCHEMAS))

.codegen: src/messages.d.ts $(TS_TYPE_FILES)

src/types/%.d.ts: ../jsonschema/%.jsonschema
	node_modules/.bin/json2ts --input $< --output $@

src/messages.js: messages.proto
	npm run pbjs

src/messages.d.ts: src/messages.js
	npm run pbts

clean:
	rm -rf dist src/messages.js src/messages.d.ts
