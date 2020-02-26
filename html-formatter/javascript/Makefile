include default.mk

npm-link-shared:
	./node_modules/.bin/npm-link-shared ./node_modules/@cucumber/react/node_modules . react
	npm run build

	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
		./bin/cucumber-html-formatter.js --format ndjson > \
		index.html
.PHONY: npm-link-shared