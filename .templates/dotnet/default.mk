SHELL := /usr/bin/env bash
ALPINE := $(shell which apk 2> /dev/null)
SLN_FILES = $(shell find . -name "*.sln")
CSPROJ_FILES = $(shell find . -name "*.csproj")
CSHARP_SOURCE_FILES = $(shell find . -name "*.cs")

default: .packed
.PHONY: default

update-dependencies:
	@echo "\033[0;31mPlease update dependencies for dotnet manually!!\033[0m"
.PHONY: update-dependencies

update-version:
ifdef NEW_VERSION
	./scripts/update-version
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif

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

# Define SNAPSHOT_SUFFIX to make pre-release: export SNAPSHOT_SUFFIX=beta-1 make publish
publish: .packed
ifdef NUGET_API_KEY
	# https://circleci.com/gh/cucumber/cucumber/edit#env-vars
	@dotnet nuget push --source https://api.nuget.org/v3/index.json --api-key "${NUGET_API_KEY}" $(shell find GeneratedNuGetPackages/Release -name "*.$(NEW_VERSION).nupkg")
else
	@echo -e "\033[0;31mNUGET_API_KEY is not defined. Can't publish :-(\033[0m"
	exit 1
endif

post-release:
	@echo "No post-release needed for dotnet"
.PHONY: post-release

clean: clean-dotnet
	rm -rf .generated .tested .built .packed GeneratedNuGetPackages
.PHONY: clean

clean-dotnet:
.PHONY: clean-dotnet
