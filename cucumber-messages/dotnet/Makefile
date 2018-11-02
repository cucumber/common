include default.mk

.deps: Cucumber.Messages/Messages.cs
	touch $@

Cucumber.Messages/Messages.cs: messages.proto
	-protoc --csharp_out Cucumber.Messages $<

clean:
	rm -f Cucumber.Messages/Messages.cs
