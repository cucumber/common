SHELL := /usr/bin/env bash
ELIXIR_SOURCE_FILES = $(shell find . -name "*.ex")

default: .tested

.tested: .deps $(ELIXIR_SOURCE_FILES)
	mix test
	touch $@

.deps: mix.lock
	touch $@

mix.lock: mix.exs
	mix local.hex --force
	mix deps.get

update-dependencies:
	@echo "TODO: Find a way to update mix.exs with the latest version numbers"
	exit 1
.PHONY: update-dependencies

pre-release: update-version update-dependencies clean default
	[ -f '/home/cukebot/import-gpg-key.sh' ] && /home/cukebot/import-gpg-key.sh
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
	@echo "TODO: Use mix or sed to update the version number in mix.exs"
	exit 1
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish: .deps
	@echo "TODO: mix release something something. Credentials will be in $HEX_USER and $HEX_PASSWORD from secrets"
	exit 1
.PHONY: publish

post-release:
	@echo "No post-release for elixir projects (yet)"
.PHONY: post-release

clean:
	rm -rf _build deps .tested .deps mix.lock
