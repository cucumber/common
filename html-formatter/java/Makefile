include default.mk

default: .acceptance
.PHONY: default

.acceptance: .tested acceptance/cucumber.html

acceptance/cucumber.html:
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
	    mvn --quiet --batch-mode exec:java \
        -Dexec.mainClass=io.cucumber.htmlformatter.Main > \
        $@

.deps: src/main/resources/io/cucumber/htmlformatter/cucumber-react.css src/main/resources/io/cucumber/htmlformatter/cucumber-html.js
        -Dexec.args="$@"

src/main/resources/io/cucumber/htmlformatter/cucumber-react.css:
	cp ../../react/javascript/dist/src/styles/cucumber-react.css $@

src/main/resources/io/cucumber/htmlformatter/cucumber-html.js:
	cp ../javascript/dist/main.js $@

clean: clean-java clean-html-formatter-java
.PHONY: clean

clean-html-formatter-java:
	rm src/main/resources/io/cucumber/htmlformatter/cucumber-react.css
	rm src/main/resources/io/cucumber/htmlformatter/cucumber-html.js
.PHONY: clean-html-formatter-java
