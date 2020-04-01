LANGUAGES ?= javascript
include default.mk

default: cucumber-html-formatter cucumber-json-formatter

cucumber-html-formatter:
	mkdir -p out/cucumber-html-formatter
	-./scripts/run-formatter \
		-e .html \
		-o out/cucumber-html-formatter \
		-c "./scripts/cucumber-html-formatter" \
		javascript/features/**/*.ndjson
.PHONY: cucumber-html-formatter

cucumber-json-formatter:
	mkdir -p out/cucumber-json-formatter
	-./scripts/run-formatter \
		-e .json \
		-o out/cucumber-json-formatter \
		-c "./scripts/cucumber-json-formatter" \
		javascript/features/**/*.ndjson
.PHONY: cucumber-json-formatter