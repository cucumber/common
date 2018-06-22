SHELL := /usr/bin/env bash
PROTO_FILES = $(shell find . -name "*.proto")
PROTO_CLASSES = $(patsubst %.proto,lib/cucumber/messages/%_pb.rb,$(PROTO_FILES))

default: rspec
.PHONY: default

rspec: Gemfile.lock $(PROTO_CLASSES)
	rake
	rake install
.PHONY: rspec

lib/cucumber/messages/%_pb.rb: %.proto
	protoc --ruby_out lib/cucumber/messages $<
	# Replace require with require_relative
	perl -i -pe "s/require '(.*)_pb'/require_relative '\1_pb'/" $@

clean:
	rm lib/cucumber/messages/*_pb.rb
.PHONY: clean

Gemfile.lock: Gemfile
	bundle install
	touch $@
