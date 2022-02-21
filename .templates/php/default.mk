# Please update /.templates/php/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
SHELL := /usr/bin/env bash
PHP_SOURCE_FILES = $(shell find . -name "*.php")

### COMMON stuff for all platforms

### Common targets for all functionalities implemented on php

default: .tested
.PHONY: default

pre-release: update-version update-dependencies
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
# no-op: composer rely on git tags
endif
.PHONY: update-version

update-dependencies:
.PHONY: update-dependencies

publish:
# no-op: composer will rely on the subrepo tag
.PHONY: publish

post-release:
# no-op
.PHONY: post-release

clean:
	rm -rf vendor composer.lock
.PHONY: clean

.tested: .deps .codegen $(PHP_SOURCE_FILES)
	vendor/bin/phpunit
	vendor/bin/psalm
.PHONY: .tested

.deps: composer.lock
	touch $@

.codegen:
	touch $@

composer.lock: composer.json
	composer install
	touch $@
