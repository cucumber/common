include default.mk

.deps: .compile_messages 
	touch .deps

.compile_messages: .setup_mix_and_get_dependencies
	MIX_ENV=prod mix protox.generate --multiple-files --output-path=lib/cucumber_messages/generated --namespace=CucumberMessages messages.proto
	touch .compile_messages

.setup_mix_and_get_dependencies:
	mix local.hex --force
	mix deps.get
	touch .setup_mix_and_get_dependencies

clean:
	rm -rf _build deps .deps .tested .compile_messages .setup_mix_and_get_dependencies
	rm -rf lib/cucumber_messages/generated/*
