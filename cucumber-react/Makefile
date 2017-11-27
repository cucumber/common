default:
	yarn install --network-concurrency 1
	yarn link gherkin cucumber-event-validator cucumber-redux
	yarn test
	yarn link
.PHONY: default

clean:
	rm -rf node_modules coverage dist
.PHONY: clean
