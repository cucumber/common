include default.mk

.acceptance: .tested acceptance/cucumber.html

acceptance/cucumber.html:
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
	    mvn exec:java \
        -Dexec.mainClass=io.cucumber.htmlformatter.Main \
        -Dexec.args="$@"

.deps: src/main/resources/io/cucumber/htmlformatter/cucumber-react.css src/main/resources/io/cucumber/htmlformatter/cucumber-html.js
        -Dexec.args="$@"

src/main/resources/io/cucumber/htmlformatter/cucumber-react.css:
	cp ../../react/javascript/dist/src/styles/cucumber-react.css $@

src/main/resources/io/cucumber/htmlformatter/cucumber-html.js:
	cp ../javascript/dist/main.js $@
