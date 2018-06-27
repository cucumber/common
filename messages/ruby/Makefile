SHELL := /usr/bin/env bash

default: rspec
.PHONY: default

rspec: Gemfile.lock lib/cucumber/messages_pb.rb
	rake
	rake install
.PHONY: rspec

lib/cucumber/messages_pb.rb: messages.proto
	protoc --ruby_out lib/cucumber $<

clean:
	rm -rf lib/cucumber/messages_pb.rb
.PHONY: clean

Gemfile.lock: Gemfile
	bundle install
	touch $@
