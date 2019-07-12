include default.mk

.deps: src/main/java/io/cucumber/messages/Messages.java

src/main/java/io/cucumber/messages/Messages.java: messages.proto
	mkdir -p src/main/java
	protoc -I. -I/usr/local/include --java_out src/main/java $<

clean:
	rm -f src/main/java/io/cucumber/messages/Messages.java
