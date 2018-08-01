SHELL := /usr/bin/env bash
JAVASCRIPT_SOURCE_FILES = $(shell find . -name "*.js" -not -path "./node_modules/*")

ASYNC_SUPPORTED := $(shell node --eval "async function foo(){}" 2> /dev/null; echo $$?)

.tested: yarn.lock .deps $(JAVASCRIPT_SOURCE_FILES)
ifeq ($(ASYNC_SUPPORTED),0)
	yarn test
	touch $@
else
	yarn build-test
	yarn mocha-built
	touch $@
endif

default: .tested
.PHONY: default

yarn.lock: package.json
	yarn install --network-concurrency 1
	yarn link

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .deps yarn.lock node_modules coverage dist
.PHONY: clean-javascript
