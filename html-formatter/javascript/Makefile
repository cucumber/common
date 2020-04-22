include default.mk

CCK_NDJSONS = $(shell find ../../compatibility-kit/javascript/features -name "*.ndjson")
HTML_REPORTS = $(patsubst ../../compatibility-kit/javascript/features/%.ndjson,acceptance/%.html,$(CCK_NDJSONS))

.tested: $(HTML_REPORTS)

acceptance/%.html: ../../compatibility-kit/javascript/features/%.ndjson .built
	mkdir -p $(@D)
	cat $< | ./bin/cucumber-html-formatter.js --format ndjson > $@
