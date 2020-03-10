include default.mk

.tested: acceptance/cucumber.html

acceptance/cucumber.html: .built
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
		./bin/cucumber-html-formatter.js --format ndjson > \
		$@

