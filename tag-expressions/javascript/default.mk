SHELL := /usr/bin/env bash
TYPESCRIPT_SOURCE_FILES = $(shell find src test -type f -name "*.ts")

default: .tested .built
.PHONY: default

.deps: package-lock.json
	touch $@

.codegen:
	touch $@

.built: .deps .codegen $(TYPESCRIPT_SOURCE_FILES)
	npm run build
	touch $@

.tested: .deps .codegen $(TYPESCRIPT_SOURCE_FILES)
	TS_NODE_TRANSPILE_ONLY=1 npm run test
	touch $@

.linted: .deps .codegen $(TYPESCRIPT_SOURCE_FILES)
	npm run lint-fix
	touch $@

package-lock.json: package.json
	npm install
	touch $@

publish:
	npm publish
.PHONY: publish

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .codegen .built .tested .linted package-lock.json node_modules coverage dist
.PHONY: clean-javascript
