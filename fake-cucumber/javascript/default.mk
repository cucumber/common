SHELL := /usr/bin/env bash
# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))
TYPESCRIPT_SOURCE_FILES = $(sort $(call rwildcard,src test,*.ts *.tsx))
PRIVATE = $(shell node -e "console.log(require('./package.json').private)")
NPM ?= npm

default: .tested .built .linted
.PHONY: default

.deps: package-lock.json
	touch $@

.codegen: .deps
	touch $@

.built: .codegen $(TYPESCRIPT_SOURCE_FILES)
	$(NPM) run build
	touch $@

.tested: .built $(TYPESCRIPT_SOURCE_FILES)
	TS_NODE_TRANSPILE_ONLY=1 $(NPM) run test
	touch $@

.linted: $(TYPESCRIPT_SOURCE_FILES) .built
	$(NPM) run lint-fix
	touch $@

package-lock.json: package.json
	$(NPM) install
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
	$(NPM) --no-git-tag-version --allow-same-version version "$(NEW_VERSION)"
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish: .codegen
ifneq (true,$(PRIVATE))
	$(NPM) publish --access public
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
