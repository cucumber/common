include default.mk

.tested: acceptance-test

acceptance-test:
	npm run npm-link-shared-react
	npm run build
	
	../../fake-cucumber/javascript/bin/fake-cucumber \
		features/*.feature | \
		./bin/cucumber-html-formatter.js > \
		index.html
.PHONY: acceptance-test