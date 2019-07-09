SHELL := /usr/bin/env bash
JAVA_SOURCE_FILES = $(shell find . -name "*.java")

default: .tested
.PHONY: default

.tested: pom.xml $(JAVA_SOURCE_FILES) .deps
	mvn install
	touch $@

.deps:
	touch $@

publish:
	gpg --batch -q --fast-import ../../codesigning.key
	mvn deploy -Psign-source-javadoc --settings scripts/ci-settings.xml -DskipTests=true
.PHONY: publish

clean: clean-java
.PHONY: clean

clean-java:
	rm -rf target .deps .tested
.PHONY: clean-java
