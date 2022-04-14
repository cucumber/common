# Please update /.templates/objective-c/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
SHELL := /usr/bin/env bash
ALPINE := $(shell which apk 2> /dev/null)

### COMMON stuff for all platforms

BERP_VERSION = 1.3.0
BERP_GRAMMAR = gherkin.berp

define berp-generate-parser =
-! dotnet tool list --tool-path /usr/bin | grep "berp\s*$(BERP_VERSION)" && dotnet tool update Berp --version $(BERP_VERSION) --tool-path /usr/bin
berp -g $(BERP_GRAMMAR) -t $< -o $@ --noBOM
endef
