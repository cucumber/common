include default.mk

.deps: lib/cucumber/messages_pb.rb

lib/cucumber/messages_pb.rb: messages.proto
	protoc --ruby_out lib/cucumber $<

clean:
	rm -f lib/cucumber/messages_pb.rb
