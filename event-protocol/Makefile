EXAMPLES = $(wildcard examples/events/*.json)
SCHEMAS = $(wildcard schemas/*.json)

.PHONY: default
default: .valid

.valid: examples/events.ndjson ./validate.js $(SCHEMAS)
	cat $< | node ./validate.js
	touch $@

examples/events.ndjson: $(EXAMPLES)
	cat $(EXAMPLES) | jq --compact-output "." > $@
