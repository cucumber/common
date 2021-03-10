SHELL := /usr/bin/env bash
# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))
TYPESCRIPT_SOURCE_FILES = $(sort $(call rwildcard,src test,*.ts *.tsx))
PRIVATE = $(shell node -e "console.log(require('./package.json').private)")
NPM ?= npm
IS_TESTDATA = $(findstring -testdata,${CURDIR})

default: .tested
.PHONY: default

.codegen:
	touch $@

.tested: .codegen .tested-npm

.tested-npm: $(TYPESCRIPT_SOURCE_FILES)
	$(NPM) run test
	touch $@

pre-release: update-version update-dependencies clean default
.PHONY: pre-release

update-version:
ifeq ($(IS_TESTDATA),-testdata)
	# no-op
else
ifdef NEW_VERSION
	$(NPM) --no-git-tag-version --allow-same-version version "$(NEW_VERSION)"
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
	$(NPM) publish --access public
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
