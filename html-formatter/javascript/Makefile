include default.mk

CCK_NDJSONS = $(shell find ../../compatibility-kit/javascript/features -name "*.ndjson")
HTML_REPORTS = $(patsubst ../../compatibility-kit/javascript/features/%.ndjson,acceptance/%.html,$(CCK_NDJSONS))
HTML_REPORT_CHECKS = $(patsubst acceptance/%.html,acceptance/%.html.checked,$(HTML_REPORTS))

.built: webpack.config.js

ifdef CHECK_INTEGRITY
# We only check integrity of generated HTML reports when we're making a release.
# The integrity check only passes when package.json *doesn't* refer to modules
# using file:..
#
# When https://github.com/cucumber/cucumber/issues/1259 is fixed we might
# be able to check this all the time (including CI)
.tested: $(HTML_REPORT_CHECKS)
else
.tested: $(HTML_REPORTS)
endif

.PRECIOUS: acceptance/%.html
acceptance/%.html: ../../compatibility-kit/javascript/features/%.ndjson .built
	mkdir -p $(@D)
	cat $< | ./bin/cucumber-html-formatter.js --format ndjson > $@

acceptance/%.html.checked: acceptance/%.html
	node check.js $< > $@
