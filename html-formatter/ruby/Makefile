include default.mk

CCK_NDJSONS = $(shell find ../../compatibility-kit/javascript/features -name "*.ndjson")
HTML_REPORTS = $(patsubst ../../compatibility-kit/javascript/features/%.ndjson,acceptance/%.html,$(CCK_NDJSONS))

.tested: $(HTML_REPORTS)

acceptance/%.html: ../../compatibility-kit/javascript/features/%.ndjson
	mkdir -p $(@D)
	cat $< | bundle exec bin/cucumber-html-formatter > $@

.deps: assets/cucumber-html.css assets/cucumber-html.js assets/index.mustache.html

assets/cucumber-html.css: ../javascript/dist/main.css
	mkdir -p $(@D)
	cp $< $@

assets/cucumber-html.js: ../javascript/dist/main.js
	mkdir -p $(@D)
	cp $< $@

assets/index.mustache.html: ../javascript/dist/src/index.mustache.html
	mkdir -p $(@D)
	cp $< $@

clean:
	rm -f assets/cucumber-html.css assets/cucumber-html.js assets/index.mustache.html
