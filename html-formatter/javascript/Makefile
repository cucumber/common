include default.mk

.tested: acceptance/cucumber.html

acceptance/cucumber.html: .built-npm-link-shared
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
		./bin/cucumber-html-formatter.js --format ndjson > \
		$@

.built-npm-link-shared:
	./node_modules/.bin/npm-link-shared ./node_modules/@cucumber/react/node_modules . react
	touch $@
