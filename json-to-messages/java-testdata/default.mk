# Please update /.templates/java/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
SHELL := /usr/bin/env bash
JAVA_SOURCE_FILES = $(shell find . -name "*.java")
IS_TESTDATA = $(findstring -testdata,${CURDIR})

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

default: .tested
.PHONY: default

.tested: .tested-jar-check

.tested-jar-check: .deps .built
	./scripts/check-jar.sh $(JAR)
	touch $@

.built: pom.xml $(JAVA_SOURCE_FILES)
	mvn install
	touch $@

.deps:
	touch $@

update-dependencies:
	mvn versions:force-releases
	mvn versions:use-latest-versions -Dmaven.version.rules=file://$(shell pwd)/maven-versions-rules.xml
	ruby scripts/set_version_ranges.rb
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
ifeq ($(IS_TESTDATA),-testdata)
	# no-op
else
	mvn deploy -Psign-source-javadoc -DskipTests=true
endif
.PHONY: publish

post-release:
	scripts/post-release.sh
.PHONY: post-release

clean: clean-java
.PHONY: clean

clean-java:
	rm -rf target .deps .tested* .built acceptance
	mvn clean
.PHONY: clean-java

### COMMON stuff for all platforms

BERP_VERSION = 1.3.0

define berp-generate-parser =
-! dotnet tool list --tool-path /usr/bin | grep "berp\s*$(BERP_VERSION)" && dotnet tool update Berp --version $(BERP_VERSION) --tool-path /usr/bin
berp -g gherkin.berp -t $< -o $@ --noBOM
endef
