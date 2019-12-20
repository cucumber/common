SHELL := /usr/bin/env bash
RUBY_SOURCE_FILES = $(shell find . -name "*.rb")
GEMSPEC = $(shell find . -name "*.gemspec")

default: .tested
.PHONY: default

.deps: Gemfile.lock
	touch $@

Gemfile.lock: Gemfile $(GEMSPEC)
	bundle install
	touch $@

.tested: .deps $(RUBY_SOURCE_FILES)
	bundle exec rspec --color
	touch $@

update-dependencies:
	./scripts/update-gemspec
.PHONY: update-dependencies

pre-release: update-dependencies clean default
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
ifneq (,$(GEMSPEC))
	sed -i "s/\(s\.version *= *'\)[0-9]*\.[0-9]*\.[0-9]*\('\)/\1$(NEW_VERSION)\2/" $(GEMSPEC)
endif
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish: .deps
ifneq (,$(GEMSPEC))
	gem build $(GEMSPEC)
	gem push $$(find . -name "*$(NEW_VERSION).gem")
else
	@echo "Not publishing because there is no gemspec"
endif
.PHONY: publish

post-release:
	@echo "No post-release needed for ruby"
.PHONY: post-release

clean: clean-ruby
.PHONY: clean

clean-ruby:
	rm -f .deps .linked .tested* Gemfile.lock *.gem
.PHONY: clean-ruby
