# Please update /.templates/java/.travis.yml in the cucumber/cucumber monorepo
# and sync:
#
#     source scripts/functions.sh && rsync_files
#
default: .built
.PHONY: default

.built: pom.xml src/main/java/io/cucumber/messages/Messages.java
	mvn install
	touch $@

src/main/java/io/cucumber/messages/Messages.java: messages.proto
	mkdir -p src/main/java
	protoc --java_out src/main/java $<

clean:
	rm -rf target .built src/main/java/io/cucumber/messages/Messages.java
.PHONY: clean
