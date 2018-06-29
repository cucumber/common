default:
	yarn install --network-concurrency 1
	yarn link gherkin cucumber-event-validator
	yarn test
	yarn link
.PHONY: default

clean:
	rm -rf yarn.lock node_modules coverage dist
.PHONY: clean
