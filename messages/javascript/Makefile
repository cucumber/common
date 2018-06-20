default: test
.PHONY: default

index.js: sources.proto gherkin.proto pickles.proto
	./node_modules/.bin/pbjs --target static-module --wrap commonjs $^ --out index.js

test: yarn.lock index.js
	yarn test
.PHONY: test

yarn.lock: package.json
	yarn install --network-concurrency 1
	yarn link

clean:
	rm -rf node_modules index.js yarn.lock
.PHONY: clean
