SHELL := /usr/bin/env bash
# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))
TYPESCRIPT_SOURCE_FILES = $(sort $(call rwildcard,src test,*.ts *.tsx))
PRIVATE = $(shell node -e "console.log(require('./package.json').private)")
IS_TESTDATA = $(findstring -testdata,${CURDIR})
NPM_MODULE = $(shell cat package.json | jq .name --raw-output)

default: .tested
.PHONY: default

.codegen:
	touch $@

.tested: .tested-npm

.tested-npm: $(TYPESCRIPT_SOURCE_FILES) .codegen
	npm run test
	touch $@

pre-release: clean update-version update-dependencies default
.PHONY: pre-release

update-dependencies:
	../../node_modules/.bin/npm-check-updates --upgrade && \
	pushd ../.. && \
	npm install && \
	npm run build && \
	popd
.PHONY: update-dependencies

update-version:
ifeq ($(IS_TESTDATA),-testdata)
	# no-op
else
ifdef NEW_VERSION
	npm --no-git-tag-version --allow-same-version version "$(NEW_VERSION)"
	# Update all npm packages that depend on us
	pushd ../.. && \
		./scripts/npm-each update_npm_dependency_if_exists package.json "$(NPM_MODULE)" "^$(NEW_VERSION)"
		# npm install
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
endif
.PHONY: update-version

publish: .codegen
ifeq ($(IS_TESTDATA),-testdata)
	# no-op
else
ifneq (true,$(PRIVATE))
	npm publish --access public
else
	@echo "Not publishing private npm module"
endif
endif
.PHONY: publish

post-release:
.PHONY: post-release

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .deps .codegen .tested* node_modules coverage dist acceptance
.PHONY: clean-javascript
