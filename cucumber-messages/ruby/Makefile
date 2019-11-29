include default.mk

.deps: lib/cucumber/messages.pb.rb

lib/cucumber/messages.pb.rb: messages.proto
	bundle exec rake protobuf:compile[.,.,lib/cucumber]

clean:
	rm -f lib/cucumber/messages.pb.rb
