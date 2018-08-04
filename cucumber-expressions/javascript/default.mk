SHELL := /usr/bin/env bash
JAVASCRIPT_SOURCE_FILES = $(shell find . -name "*.js" -not -path "./node_modules/*")

ifdef TRAVIS_BRANCH
	LIBRARY_VERSION=$(TRAVIS_BRANCH)
endif
ifdef TRAVIS_TAG
	LIBRARY_VERSION=$(TRAVIS_TAG)
endif
ifndef LIBRARY_VERSION
	LIBRARY_VERSION=$(shell git rev-parse --abbrev-ref HEAD)
endif

ASYNC_SUPPORTED := $(shell node --eval "async function foo(){}" 2> /dev/null; echo $$?)

.tested: yarn.lock .deps $(JAVASCRIPT_SOURCE_FILES)
ifeq ($(ASYNC_SUPPORTED),0)
	yarn coverage
	touch $@
else
	yarn build
	yarn build-test
	yarn mocha-built
	touch $@
endif

default: .tested .eslinted
.PHONY: default

.eslinted: $(JAVASCRIPT_SOURCE_FILES)
	yarn eslint-fix
	touch $@

yarn.lock: package.json
	yarn install --ignore-engines --network-concurrency 1
	yarn link

clean: clean-javascript
.PHONY: clean

clean-javascript:
	rm -rf .deps yarn.lock node_modules coverage dist/*
.PHONY: clean-javascript
