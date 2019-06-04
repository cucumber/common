SHELL := /usr/bin/env bash
RUBY_SOURCE_FILES = $(shell find . -name "*.rb")
GEMSPECS = $(shell find . -name "*.gemspec")

ifdef TRAVIS_TAG
	LIBRARY_VERSION=$(TRAVIS_TAG)
else
	LIBRARY_VERSION=master
endif

default: .tested
.PHONY: default

.deps: Gemfile.lock

Gemfile.lock: Gemfile $(GEMSPECS)
	bundle install
	touch $@

.tested: .deps $(RUBY_SOURCE_FILES)
	bundle install && bundle exec rspec --color
	touch $@

clean: clean-ruby
.PHONY: clean

clean-ruby:
	rm -f .deps .linked .tested Gemfile.lock
.PHONY: clean-ruby
