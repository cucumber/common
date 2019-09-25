include default.mk

npm-link-shared:
	./node_modules/.bin/npm-link-shared ./node_modules/cucumber-react/node_modules . react
	npm run build

	../../fake-cucumber/javascript/bin/fake-cucumber \
		features/*.feature | \
		./bin/cucumber-html-formatter.js > \
		index.html
.PHONY: npm-link-shared