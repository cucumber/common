include default.mk

.tested: acceptance/cucumber.html

acceptance/cucumber.html:
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
	mvn --quiet --batch-mode exec:java \
	  -Dexec.mainClass=io.cucumber.htmlformatter.Main > \
	$@

.deps: target/classes/io/cucumber/htmlformatter/cucumber-react.css target/classes/io/cucumber/htmlformatter/cucumber-html.js target/classes/io/cucumber/htmlformatter/index.mustache.html

target/classes/io/cucumber/htmlformatter/cucumber-react.css:
	mkdir -p $(@D)
	cp ../../react/javascript/dist/src/styles/cucumber-react.css $@

target/classes/io/cucumber/htmlformatter/cucumber-html.js:
	mkdir -p $(@D)
	cp ../javascript/dist/main.js $@

target/classes/io/cucumber/htmlformatter/index.mustache.html:
	mkdir -p $(@D)
	cp ../javascript/dist/src/index.mustache.html $@
