SHELL := /usr/bin/env bash

update-dependencies:
	# no-op
.PHONY: update-dependencies

pre-release: update-dependencies clean default
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
	sed -i "s/[0-9]*\.[0-9]*\.[0-9]*/$(NEW_VERSION)/" VERSION
else
	@echo -e "\033[0;NEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish:
	# no-op
.PHONY: publish

post-release:
	# no-op
.PHONY: post-release
