SHELL := /usr/bin/env bash
TYPESCRIPT_SOURCE_FILES = $(shell find src test -type f -name "*.ts" -o -name "*.tsx")
PRIVATE = $(shell node -e "console.log(require('./package.json').private)")

default: .linted .tested .built
.PHONY: default

.deps: package-lock.json build-internal-dependencies
ifndef NEW_VERSION
	if [ -f ".internal-dependencies" ]; then cat .internal-dependencies | xargs -n 1 scripts/npm-link; fi
endif
	touch $@

build-internal-dependencies:
	@while read -r file; do \
    pushd "../../$$file/javascript" && make && popd; \
  done <.internal-dependencies
.PHONY: build-internal-dependencies

.codegen: .deps
	touch $@

.built: .codegen $(TYPESCRIPT_SOURCE_FILES)
	npm run build
	touch $@

.tested: .built $(TYPESCRIPT_SOURCE_FILES)
	TS_NODE_TRANSPILE_ONLY=1 npm run test
	touch $@

.linted: $(TYPESCRIPT_SOURCE_FILES) package-lock.json
	npm run lint-fix
	touch $@

package-lock.json: package.json
	npm install
	touch $@

update-dependencies:
	npx npm-check-updates --upgrade
.PHONY: update-dependencies

pre-release: update-dependencies clean default
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
	npm publish
else
	@echo "Not publishing private npm module"
endif
.PHONY: publish

post-release:
	@echo "No post-release needed for javascript"
.PHONY: post-release

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .deps .codegen .built .tested* .linted package-lock.json node_modules coverage dist acceptance
.PHONY: clean-javascript
