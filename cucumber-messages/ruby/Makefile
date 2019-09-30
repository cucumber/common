include default.mk
LIBNAME = $(shell $(cd "..";basename $(pwd)))

default: pkg/.installable_tested

.deps: lib/cucumber/messages_pb.rb

lib/cucumber/messages_pb.rb: messages.proto
	protoc -I. --ruby_out lib/cucumber $<

pkg/.installable_tested: pkg/cucumber-messages-%.gem
	gem install pkg/cucumber-messages-*.gem

pkg/cucumber-messages-%.gem: .tested
	rake build

clean:
	rm -f lib/cucumber/messages_pb.rb pkg/.installable_tested
