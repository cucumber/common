SHELL := /usr/bin/env bash
JAVASCRIPT_SOURCE_FILES = $(shell find src test -type f -name "*.js")
TYPESCRIPT_SOURCE_FILES = $(shell find src test -type f -name "*.ts")

ifdef TRAVIS_TAG
	LIBRARY_VERSION=$(TRAVIS_TAG)
else
	LIBRARY_VERSION=master
endif

ASYNC_SUPPORTED := $(shell node --eval "async function foo(){}" 2> /dev/null; echo $$?)

default: .tested .linted
.PHONY: default

.codegen: .deps

.tested: package-lock.json .codegen $(JAVASCRIPT_SOURCE_FILES) $(TYPESCRIPT_SOURCE_FILES)
	npm run build
ifeq ($(ASYNC_SUPPORTED),0)
	npm run test
else
	npm run build-test
	npm run mocha-built
endif
	touch $@

.linted: $(JAVASCRIPT_SOURCE_FILES) $(TYPESCRIPT_SOURCE_FILES)
	npm run lint-fix
	touch $@

.deps: package-lock.json

package-lock.json: package.json
	npm install
	npm link
	touch $@

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .codegen .linted package-lock.json node_modules coverage dist
.PHONY: clean-javascript
