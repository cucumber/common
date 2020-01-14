include default.mk

.deps: lib/cucumber/messages.pb.rb

lib/cucumber/messages.pb.rb: messages.proto
	mv $< $<.bak
	cat $<.bak | sed "s/package io.cucumber.messages/package cucumber.messages/" > $<
	bundle exec rake protobuf:compile[.,.,lib/cucumber]
	mv $<.bak $<

clean:
	rm -f lib/cucumber/messages.pb.rb
