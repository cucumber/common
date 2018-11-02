SHELL := /usr/bin/env bash
SPEC_DIR = $(shell find . -name "*.Specs")
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

.built: $(SLN_FILES) $(CSPROJ_FILES) $(CSHARP_SOURCE_FILES) .deps
	dotnet build

.tested: .built
	cd $(SPEC_DIR) && dotnet test --no-build -f netcoreapp2.0
	touch $@

clean: clean-java
.PHONY: clean

clean-java:
	rm -rf .deps .tested .built
.PHONY: clean-java
