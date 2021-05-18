# Please update /.templates/dotnet/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
SHELL := /usr/bin/env bash
ALPINE := $(shell which apk 2> /dev/null)
SLN_FILES = $(shell find . -name "*.sln")
CSPROJ_FILES = $(shell find . -name "*.csproj")
CSHARP_SOURCE_FILES = $(shell find . -name "*.cs")

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

default: .packed
.PHONY: default

update-dependencies:
	@echo -e "\033[0;31mPlease update dependencies for dotnet manually!!\033[0m"
.PHONY: update-dependencies

pre-release: update-version update-dependencies clean default
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
	./scripts/update-version
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif

.built: $(SLN_FILES) $(CSPROJ_FILES) $(CSHARP_SOURCE_FILES) .generated
	dotnet build -c Release -p:SnapshotSuffix="$(SNAPSHOT_SUFFIX)"
	touch $@

.generated:
	touch $@

.tested: .built
	dotnet test
	touch $@

.packed: .tested
	touch $@

# Define SNAPSHOT_SUFFIX to make pre-release: export SNAPSHOT_SUFFIX=beta-1 make publish
publish: .packed
ifdef NUGET_API_KEY
	# https://circleci.com/gh/cucumber/cucumber/edit#env-vars
	@dotnet nuget push --source https://api.nuget.org/v3/index.json --api-key "${NUGET_API_KEY}" $(shell find */bin/Release/NuGet -name "*.$(NEW_VERSION).nupkg")
else
	@echo -e "\033[0;31mNUGET_API_KEY is not defined. Can't publish :-(\033[0m"
	exit 1
endif

post-release:
	@echo "No post-release needed for dotnet"
.PHONY: post-release

clean: clean-dotnet
.PHONY: clean

clean-dotnet:
	rm -rf .generated .tested .built .packed GeneratedNuGetPackages
	rm -rf */bin
	rm -rf */obj
.PHONY: clean-dotnet

### COMMON stuff for all platforms

BERP_VERSION = 1.3.0

define berp-generate-parser =
-! dotnet tool list --tool-path /usr/bin | grep "berp\s*$(BERP_VERSION)" && dotnet tool update Berp --version $(BERP_VERSION) --tool-path /usr/bin
berp -g gherkin.berp -t $< -o $@ --noBOM
endef
