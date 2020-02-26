include default.mk

$(LOCKFILE): .built-npm-link-shared

.built-npm-link-shared:
	./node_modules/.bin/npm-link-shared ./node_modules/@cucumber/react/node_modules . react
	touch $@

.tested: acceptance/cucumber.html

acceptance/cucumber.html:
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
		./bin/cucumber-html-formatter.js --format ndjson > \
		$@
