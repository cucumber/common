SHELL := /usr/bin/env bash

default: rspec
.PHONY: default

rspec: Gemfile.lock lib/cucumber/messages.rb
	rake
	rake install
.PHONY: rspec

lib/cucumber/messages.rb: messages.proto
	protoc --ruby_out lib/cucumber $<

clean:
	rm -rf lib/cucumber/messages.rb
.PHONY: clean

Gemfile.lock: Gemfile
	bundle install
	touch $@
