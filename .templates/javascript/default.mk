SHELL := /usr/bin/env bash
JAVASCRIPT_SOURCE_FILES = $(shell find . -name "*.js" -not -path "./node_modules/*")

ifdef TRAVIS_TAG
	LIBRARY_VERSION=$(TRAVIS_TAG)
else
	LIBRARY_VERSION=master
endif

ASYNC_SUPPORTED := $(shell node --eval "async function foo(){}" 2> /dev/null; echo $$?)

.tested: package-lock.json .deps $(JAVASCRIPT_SOURCE_FILES)
	npm run build
ifeq ($(ASYNC_SUPPORTED),0)
	npm run coverage
else
	npm run build-test
	npm run mocha-built
endif
	touch $@

default: .tested .eslinted
.PHONY: default

.eslinted: $(JAVASCRIPT_SOURCE_FILES)
	npm run eslint-fix
	touch $@

package-lock.json: package.json
	npm install
	npm link
	touch $@

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .deps package-lock.json node_modules coverage dist
.PHONY: clean-javascript
