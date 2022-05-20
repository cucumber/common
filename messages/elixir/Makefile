include default.mk

clean:
	rm -rf _build deps .deps .tested
	rm -rf lib/cucumber_messages/generated/*

# .deps: setup_mix_and_get_dependencies update_proto_file compile_messages revert_proto_file
.deps: setup_mix_and_get_dependencies compile_messages
	touch .deps

setup_mix_and_get_dependencies:
	mix local.hex --force
	mix deps.get
.PHONY: setup_mix_and_get_dependencies

# update_proto_file: messages.proto
# 	mv $< $<.bak
# 	cat $<.bak | sed "s/package io.cucumber.messages/package cucumber_messages/" > $<

compile_messages:
	mix generate_json_structs
.PHONY: compile_messages

# revert_proto_file: messages.proto.bak
# 	mv messages.proto.bak messages.proto
# .PHONY: revert_proto_file
