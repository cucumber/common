include default.mk

.deps: setup_mix_and_get_dependencies update_proto_file compile_messages revert_proto_file
	touch .deps

compile_messages:
	MIX_ENV=prod mix protox.generate --multiple-files --output-path=lib/cucumber_messages/generated messages.proto
.PHONY: compile_messages

setup_mix_and_get_dependencies:
	mix local.hex --force
	mix deps.get
.PHONY: setup_mix_and_get_dependencies

clean:
	rm -rf _build deps .deps .tested
	rm -rf lib/cucumber_messages/generated/*

update_proto_file: messages.proto
	mv $< $<.bak
	cat $<.bak | sed "s/package io.cucumber.messages/package cucumber_messages/" > $<

revert_proto_file: messages.proto.bak
	mv messages.proto.bak messages.proto
.PHONY: revert_proto_file
