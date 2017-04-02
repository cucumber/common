default:
	# Yarn fails to install relative dependencies
	npm install
	yarn link gherkin cucumber-react cucumber-redux cucumber-event-validator
	yarn test
	yarn link
.PHONY: default

clean:
	rm -rf node_modules coverage dist
.PHONY: clean
