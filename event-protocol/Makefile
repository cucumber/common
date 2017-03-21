EXAMPLES = $(wildcard examples/events/*.json)
SCHEMAS = $(wildcard schemas/*.json)
SRC = $(wildcard bin/* lib/*)

default: .valid
.PHONY: default

install: .valid
	yarn link
.PHONY: install

yarn.lock: package.json
	yarn install

.built: yarn.lock $(SRC)
	yarn test
	touch $@

clean:
	rm -rf yarn.lock node_modules coverage dist .built .valid examples/events.ndjson
.PHONY: clean

.valid: examples/events.ndjson yarn.lock ./bin/cucumber-event-validator.js $(SCHEMAS) $(SRC)
	@cat $< | node ./bin/cucumber-event-validator.js
	@touch $@

examples/events.ndjson: $(EXAMPLES)
	@cat $(EXAMPLES) | jq --compact-output "." > $@
