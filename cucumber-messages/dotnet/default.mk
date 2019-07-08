SHELL := /usr/bin/env bash
ALPINE := $(shell which apk 2> /dev/null)
SLN_FILES = $(shell find . -name "*.sln")
CSPROJ_FILES = $(shell find . -name "*.csproj")
CSHARP_SOURCE_FILES = $(shell find . -name "*.cs")

ifndef CIRCLE_TAG
	SNAPSHOT_SUFFIX=$(CIRCLE_BUILD_NUM)
ifndef LIBRARY_VERSION
	SNAPSHOT_SUFFIX=$(shell git rev-parse --abbrev-ref HEAD)
endif
endif

default: .packed
.PHONY: default

.built: $(SLN_FILES) $(CSPROJ_FILES) $(CSHARP_SOURCE_FILES) .generated
	dotnet build -bl -c Release -p:SnapshotSuffix="$(SNAPSHOT_SUFFIX)"
	touch $@

.generated:
	touch $@

.tested: .built
	dotnet test
	touch $@

.packed: .tested
	dotnet pack -c Release -p:SnapshotSuffix="$(SNAPSHOT_SUFFIX)"
	touch $@

publish: .packed
ifdef NUGET_API_KEY
	# https://circleci.com/gh/cucumber/cucumber/edit#env-vars
	@dotnet nuget push --source https://api.nuget.org/v3/index.json --api-key "${NUGET_API_KEY}" $(shell find GeneratedNuGetPackages/Release -name "*.nupkg")
else
	@echo -e "\033[0;31mNUGET_API_KEY is not defined. Can't publish :-(\033[0m"
	exit 1
endif

clean: clean-dotnet
	rm -rf .generated .tested .built .packed GeneratedNuGetPackages
.PHONY: clean

clean-dotnet:
.PHONY: clean-dotnet
