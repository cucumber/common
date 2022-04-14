SHELL := /usr/bin/env bash
# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

update-dependencies:
	# no-op
.PHONY: update-dependencies

pre-release: update-dependencies clean default
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
	sed -i "s/[0-9]*\.[0-9]*\.[0-9]*/$(NEW_VERSION)/" VERSION
else
	@echo -e "\033[0;NEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish:
	# no-op
.PHONY: publish

post-release:
	# no-op
.PHONY: post-release

### COMMON stuff for all platforms

BERP_VERSION = 1.3.0
BERP_GRAMMAR = gherkin.berp

define berp-generate-parser =
-! dotnet tool list --tool-path /usr/bin | grep "berp\s*$(BERP_VERSION)" && dotnet tool update Berp --version $(BERP_VERSION) --tool-path /usr/bin
berp -g $(BERP_GRAMMAR) -t $< -o $@ --noBOM
endef
