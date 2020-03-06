include default.mk

# TODO: This should run after all steps default goal
.acceptance: acceptance/cucumber.html

acceptance/cucumber.html:
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
	    mvn exec:java \
        -Dexec.mainClass=io.cucumber.htmlformatter.Main \
        -Dexec.args="$@"

# TODO: This should run before all steps in the default goal
# TODO: These resources are currently broken
#.update-resources:
#	cp ../../react/javascript/dist/src/styles/cucumber-react.css src/main/resources/io/cucumber/htmlformatter/cucumber-react.css
#	cp ../javascript/dist/main.js src/main/resources/io/cucumber/htmlformatter/cucumber-html.js
#.PHONY: .update-resources

