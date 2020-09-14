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
	mix deps.unlock --all && mix deps.update --all
.PHONY: update-dependencies

pre-release: update-version update-dependencies clean default
	[ -f '/home/cukebot/import-gpg-key.sh' ] && /home/cukebot/import-gpg-key.sh
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
	sed 's/@vsn ".\..\.."/@vsn "'"$NEW_VERSION"'"/' mix.exs
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish: .deps
ifdef HEX_API_KEY
	mix hex.publish --yes 
else
	@echo -e "\033[0;31mHEX_API_KEY is not defined. Can't update version :-(\033[0m"
	exit 1
endif

.PHONY: publish

post-release:
	@echo "No post-release for elixir projects (yet)"
.PHONY: post-release

clean:
	rm -rf _build deps .tested .deps mix.lock
