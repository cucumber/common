include default.mk

.deps: src/main/java/io/cucumber/messages/Messages.java
	touch $@

src/main/java/io/cucumber/messages/Messages.java: messages.proto
	mkdir -p src/main/java
	protoc --java_out src/main/java $<

clean:
	rm -f src/main/java/io/cucumber/messages/Messages.java
