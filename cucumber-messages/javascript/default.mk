SHELL := /usr/bin/env bash
TYPESCRIPT_SOURCE_FILES = $(shell find src test -type f -name "*.ts")

ifdef TRAVIS_TAG
	LIBRARY_VERSION=$(TRAVIS_TAG)
else
	LIBRARY_VERSION=master
endif

default: .built .published-snapshot
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
	npm run lint-fix
	touch $@

.published-snapshot: .tested .linted
ifdef NPM_SNAPSHOT_REGISTRY
ifdef NPM_SNAPSHOT_REGISTRY_TOKEN
ifdef TRAVIS_BUILD_NUMBER
	mv .npmrc_snapshots .npmrc
	npm publish --tag $$(./node_modules/.bin/npm-snapshot $${TRAVIS_BUILD_NUMBER})
endif
endif
endif
	touch $@

package-lock.json: package.json
	npm install
	touch $@

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .codegen .built .tested .linted .published-snapshot package-lock.json node_modules coverage dist
.PHONY: clean-javascript
