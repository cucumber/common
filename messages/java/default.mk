SHELL := /usr/bin/env bash
JAVA_SOURCE_FILES = $(shell find . -name "*.java")
ARTIFACT_ID = $(shell xmlstarlet sel -N pom="http://maven.apache.org/POM/4.0.0" -t -m "/pom:project/pom:artifactId" -v . pom.xml)
VERSION = $(shell xmlstarlet sel -N pom="http://maven.apache.org/POM/4.0.0" -t -m "/pom:project/pom:version" -v . pom.xml)
JAR = target/$(ARTIFACT_ID)-$(VERSION).jar

default: .tested
.PHONY: default

.tested: .deps .built
	./scripts/check-jar.sh $(JAR)
	touch $@

.built: $(JAR)
	touch $@

$(JAR): pom.xml $(JAVA_SOURCE_FILES) 
	mvn install

.deps:
	touch $@

update-dependencies:
	mvn versions:force-releases
	mvn versions:use-latest-versions -Dmaven.version.rules=file://$(shell pwd)/maven-versions-rules.xml
.PHONY: update-dependencies

pre-release: update-version update-dependencies clean default
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
	mvn versions:set -DnewVersion=$(NEW_VERSION) -DgenerateBackupPoms=false
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish: .deps
	mvn deploy -Psign-source-javadoc --settings scripts/ci-settings.xml -DskipTests=true
.PHONY: publish

post-release:
	scripts/post-release.sh
.PHONY: post-release

clean: clean-java
.PHONY: clean

clean-java:
	rm -rf target .deps .tested* .built
	mvn clean
.PHONY: clean-java
