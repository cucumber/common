EXAMPLES = $(wildcard examples/events/*.json)
SCHEMAS = $(wildcard schemas/*.json)

.PHONY: default
default: .valid

.valid: examples/events.ndjson ./bin/cucumber-event-validator.js $(SCHEMAS)
	@cat $< | node ./bin/cucumber-event-validator.js
	@touch $@

examples/events.ndjson: $(EXAMPLES)
	@cat $(EXAMPLES) | jq --compact-output "." > $@

.PHONY: clean
clean:
	rm -rf .valid examples/events.ndjson
