include default.mk

.tested: acceptance/cucumber.html

acceptance/cucumber.html: .update-resources
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
	    mvn exec:java \
        -Dexec.mainClass=io.cucumber.htmlformatter.Main \
        -Dexec.args="$@"

.update-resources:
	cp ../../react/javascript/dist/src/styles/cucumber-react.css src/main/resources/io/cucumber/htmlformatter/cucumber-react.css
	cp ../javascript/dist/main.js src/main/resources/io/cucumber/htmlformatter/cucumber-html.js
.PHONY: .update-resources

