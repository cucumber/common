include default.mk

CCK_NDJSONS = $(shell find ../../compatibility-kit/javascript/features -name "*.ndjson")
HTML_REPORTS = $(patsubst ../../compatibility-kit/javascript/features/%.ndjson,acceptance/%.html,$(CCK_NDJSONS))
HTML_REPORT_CHECKS = $(patsubst acceptance/%.html,acceptance/%.html.checked,$(HTML_REPORTS))

.built: webpack.config.js dist/main.js dist/src/index.mustache.html dist/cucumber-react.css

dist/main.js: dist/src/main.js
	../../node_modules/.bin/webpack-cli

dist/src/index.mustache.html: src/index.mustache.html
	cp $< $@

dist/cucumber-react.css: ../../node_modules/@cucumber/react/dist/src/styles/cucumber-react.css
	cp $< $@

.tested: $(HTML_REPORT_CHECKS)

.PRECIOUS: acceptance/%.html
acceptance/%.html: ../../compatibility-kit/javascript/features/%.ndjson .built
	mkdir -p $(@D)
	cat $< | ./bin/cucumber-html-formatter.js --format ndjson > $@

acceptance/%.html.checked: acceptance/%.html
	node check.js $< > $@
