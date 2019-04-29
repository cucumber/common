SHELL := /usr/bin/env bash
SLN_FILES = $(shell find . -name "*.sln")
CSPROJ_FILES = $(shell find . -name "*.csproj")
CSHARP_SOURCE_FILES = $(shell find . -name "*.cs")

ifdef TRAVIS_BRANCH
	LIBRARY_VERSION=$(TRAVIS_BRANCH)
endif
ifdef TRAVIS_TAG
	LIBRARY_VERSION=$(TRAVIS_TAG)
endif
ifndef LIBRARY_VERSION
	LIBRARY_VERSION=$(shell git rev-parse --abbrev-ref HEAD)
endif

default: .tested
.PHONY: default

.built: $(SLN_FILES) $(CSPROJ_FILES) $(CSHARP_SOURCE_FILES)
	dotnet build -bl

.tested: .built
	dotnet test
	touch $@

clean: clean-java
.PHONY: clean

clean-java:
	rm -rf .tested .built
.PHONY: clean-java
