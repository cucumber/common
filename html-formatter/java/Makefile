include default.mk

CCK_NDJSONS = $(shell find ../../compatibility-kit/javascript/features -name "*.ndjson")
HTML_REPORTS = $(patsubst ../../compatibility-kit/javascript/features/%.ndjson,acceptance/%.html,$(CCK_NDJSONS))

.tested: $(HTML_REPORTS)

acceptance/%.html: ../../compatibility-kit/javascript/features/%.ndjson .built
	mkdir -p $(@D)
	cat $< | mvn --quiet --batch-mode exec:java -Dexec.classpathScope=test -Dexec.mainClass=io.cucumber.htmlformatter.Main > $@

.deps: target/classes/io/cucumber/htmlformatter/cucumber-html.css target/classes/io/cucumber/htmlformatter/cucumber-html.js target/classes/io/cucumber/htmlformatter/index.mustache.html

target/classes/io/cucumber/htmlformatter/cucumber-html.css:
	mkdir -p $(@D)
	cp ../javascript/dist/main.css $@

target/classes/io/cucumber/htmlformatter/cucumber-html.js:
	mkdir -p $(@D)
	cp ../javascript/dist/main.js $@

target/classes/io/cucumber/htmlformatter/index.mustache.html:
	mkdir -p $(@D)
	cp ../javascript/dist/src/index.mustache.html $@
