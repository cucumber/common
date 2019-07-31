SHELL := /usr/bin/env bash
TYPESCRIPT_SOURCE_FILES = $(shell find src test -type f -name "*.ts")

default: .tested .built
.PHONY: default

.deps: package-lock.json
	if [ -f ".internal-dependencies" ]; then cat .internal-dependencies | xargs -n 1 scripts/npm-link; fi
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

update-dependencies:
	npx npm-check-updates --upgrade
.PHONY: update-dependencies

update-version:
ifdef NEW_VERSION
	npm --no-git-tag-version --allow-same-version version "$(NEW_VERSION)"
else
	@echo -e "\033[0;NEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish: .deps
	npm publish
.PHONY: publish

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .codegen .built .tested .linted package-lock.json node_modules coverage dist
.PHONY: clean-javascript
