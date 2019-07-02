SHELL := /usr/bin/env bash
ALPINE := $(shell which apk 2> /dev/null)
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

default: .packed
.PHONY: default

.built: $(SLN_FILES) $(CSPROJ_FILES) $(CSHARP_SOURCE_FILES) .generated
	dotnet build -bl -c Release
	touch $@

.generated:
	touch $@

.tested: .built
	dotnet test
	touch $@

.packed: .tested
	dotnet pack -c Release -p:PrereleaseVersionPostfix="$(LIBRARY_VERSION)"
	touch $@

clean: clean-dotnet
	rm -rf .generated .tested .built .packed
.PHONY: clean

clean-dotnet:
.PHONY: clean-dotnet
