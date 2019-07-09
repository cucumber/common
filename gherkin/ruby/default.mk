SHELL := /usr/bin/env bash
RUBY_SOURCE_FILES = $(shell find . -name "*.rb")
GEMSPECS = $(shell find . -name "*.gemspec")

default: .tested
.PHONY: default

.deps: Gemfile.lock
	touch $@

Gemfile.lock: Gemfile $(GEMSPECS)
	bundle install
	touch $@

.tested: .deps $(RUBY_SOURCE_FILES)
	bundle exec rspec --color
	touch $@

update-dependencies:
	./scripts/update-gemspec
.PHONY: update-dependencies

publish:
	gem build $$(find . -name "*.gemspec")
	gem push $$(find . -name "*.gem")
.PHONY: publish

clean: clean-ruby
.PHONY: clean

clean-ruby:
	rm -f .deps .linked .tested Gemfile.lock
.PHONY: clean-ruby
