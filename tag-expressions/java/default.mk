SHELL := /usr/bin/env bash
JAVA_SOURCE_FILES = $(shell find . -name "*.java")

ifdef TRAVIS_TAG
	LIBRARY_VERSION=$(TRAVIS_TAG)
else
	LIBRARY_VERSION=master
endif

default: .tested
.PHONY: default

.tested: pom.xml $(JAVA_SOURCE_FILES) .deps
	mvn install
	touch $@

clean: clean-java
.PHONY: clean

clean-java:
	rm -rf target .deps .tested
.PHONY: clean-java
