SHELL := /usr/bin/env bash
JAVA_SOURCE_FILES = $(shell find . -name "*.java")

default: .tested
.PHONY: default

.tested: pom.xml $(JAVA_SOURCE_FILES) .deps
	mvn install
	touch $@

.deps:
	touch $@

update-dependencies:
	mvn versions:force-releases
	mvn versions:use-latest-versions

update-version:
ifdef NEW_VERSION
	mvn versions:set -DnewVersion=$(NEW_VERSION) -DgenerateBackupPoms=false
else
	@echo -e "\033[0;NEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif

publish: .deps
	gpg --batch -q --fast-import ../../secrets/codesigning.key
	mvn deploy -Psign-source-javadoc --settings scripts/ci-settings.xml -DskipTests=true
.PHONY: publish

clean: clean-java
.PHONY: clean

clean-java:
	rm -rf target .deps .tested
.PHONY: clean-java
