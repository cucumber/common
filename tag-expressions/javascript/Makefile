default: test
.PHONY: default

test: yarn.lock
	yarn test
.PHONY: test

yarn.lock: package.json
	yarn install --network-concurrency 1
	yarn link

clean:
	rm -rf node_modules coverage dist
.PHONY: clean
