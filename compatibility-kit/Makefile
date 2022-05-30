LANGUAGES ?= javascript ruby
include default.mk

default: cucumber-html-formatter

cucumber-html-formatter:
	mkdir -p out/cucumber-html-formatter
	-./scripts/run-formatter \
		-e .html \
		-o out/cucumber-html-formatter \
		-c "./scripts/cucumber-html-formatter" \
		javascript/features/**/*.ndjson
.PHONY: cucumber-html-formatter
