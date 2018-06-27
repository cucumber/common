ASYNC_SUPPORTED := $(shell node --eval "async function foo(){}" 2> /dev/null)
ifdef ASYNC_SUPPORTED
	TEST_TARGET=test
else
	TEST_TARGET=babel-test
endif

default: $(TEST_TARGET)
.PHONY: default

test: yarn.lock
	yarn test
.PHONY: test

babel-test: yarn.lock
	yarn build-test
	yarn mocha-built
.PHONY: test

yarn.lock: package.json
	yarn install --network-concurrency 1
	yarn link

clean:
	rm -rf yarn.lock node_modules coverage dist
.PHONY: clean
