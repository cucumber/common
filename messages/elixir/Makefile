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

clean:
	rm -rf _build deps .tested .deps mix.lock
