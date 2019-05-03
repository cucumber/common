SHELL := /usr/bin/env bash
TYPESCRIPT_SOURCE_FILES = $(shell find src test -type f -name "*.ts")

ifdef TRAVIS_TAG
	LIBRARY_VERSION=$(TRAVIS_TAG)
else
	LIBRARY_VERSION=master
endif

default: .tested .linted .built
.PHONY: default

.codegen: .deps

.tested: package-lock.json .codegen $(TYPESCRIPT_SOURCE_FILES)
	TS_NODE_TRANSPILE_ONLY=1 npm run test
	touch $@

.linted: $(TYPESCRIPT_SOURCE_FILES)
	npm run lint-fix
	touch $@

.built: $(TYPESCRIPT_SOURCE_FILES)
	npm run build

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
