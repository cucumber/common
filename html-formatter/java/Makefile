include default.mk

# TODO: Requires JS to have been build
.acceptance: .tested acceptance/cucumber.html

acceptance/cucumber.html:
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
	    mvn exec:java \
        -Dexec.mainClass=io.cucumber.htmlformatter.Main \
        -Dexec.args="$@"

# TODO: Will this be commited?
.deps:
	SOURCE=../../react/javascript/dist/src/styles/cucumber-react.css && \
	TARGET=src/main/resources/io/cucumber/htmlformatter/cucumber-react.css && \
	 ( [[ -f $$SOURCE ]] && cp $$SOURCE $$TARGET ) || true
	SOURCE=../javascript/dist/main.js && \
	TARGET=src/main/resources/io/cucumber/htmlformatter/cucumber-html.js && \
	 ( [[ -f $$SOURCE ]] && cp $$SOURCE $$TARGET ) || true
	touch $@
