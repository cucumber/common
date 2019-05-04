SHELL := /usr/bin/env bash
TYPESCRIPT_SOURCE_FILES = $(shell find src test -type f -name "*.ts")

ifdef TRAVIS_TAG
	LIBRARY_VERSION=$(TRAVIS_TAG)
else
	LIBRARY_VERSION=master
endif

default: .built .tested .linted
.PHONY: default

.deps: package-lock.json
	touch $@

.codegen:
	touch $@

.built: .deps .codegen $(TYPESCRIPT_SOURCE_FILES)
	npm run build

.tested: .deps .codegen $(TYPESCRIPT_SOURCE_FILES)
	TS_NODE_TRANSPILE_ONLY=1 npm run test
	touch $@

.linted: .deps .codegen $(TYPESCRIPT_SOURCE_FILES)
	npm run lint
	touch $@

package-lock.json: package.json
	npm install
	npm link
	touch $@

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .codegen .linted package-lock.json node_modules coverage dist
.PHONY: clean-javascript
