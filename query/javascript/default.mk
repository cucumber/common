SHELL := /usr/bin/env bash
TYPESCRIPT_SOURCE_FILES = $(shell find src test -type f -name "*.ts" -o -name "*.tsx")
PRIVATE = $(shell node -e "console.log(require('./package.json').private)")

default: .tested .built .linted
.PHONY: default

.deps: package-lock.json
	touch $@

.codegen: .deps
	touch $@

.built: .codegen $(TYPESCRIPT_SOURCE_FILES)
	npm run build
	touch $@

.tested: .built $(TYPESCRIPT_SOURCE_FILES)
	TS_NODE_TRANSPILE_ONLY=1 npm run test
	touch $@

.linted: $(TYPESCRIPT_SOURCE_FILES) .built
	npm run lint-fix
	touch $@

package-lock.json: package.json
	npm install
	touch $@

update-dependencies:
	npx npm-check-updates --upgrade
.PHONY: update-dependencies

remove-local-dependencies:
	cat package.json | sed 's/"@cucumber\/\(.*\)": "file:..\/..\/.*"/"@cucumber\/\1": "^0.0.0"/' > package.json.tmp
	mv package.json.tmp package.json
.PHONY: remove-local-dependencies

pre-release: remove-local-dependencies update-version update-dependencies clean default
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
	npm --no-git-tag-version --allow-same-version version "$(NEW_VERSION)"
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish: .codegen
ifneq (true,$(PRIVATE))
	npm publish --access public
else
	@echo "Not publishing private npm module"
endif
.PHONY: publish

post-release:
	cat package.json | sed 's/"@cucumber\/\(.*\)": .*"/"@cucumber\/\1": "file:..\/..\/\1\/javascript"/' > package.json.tmp
	mv package.json.tmp package.json
.PHONY: post-release

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .deps .codegen .built .tested* .linted package-lock.json node_modules coverage dist acceptance
.PHONY: clean-javascript
