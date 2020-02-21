SHELL := /usr/bin/env bash
PACKAGES ?= c21e \
	messages \
	gherkin \
	cucumber-expressions \
	tag-expressions \
	fake-cucumber \
	query \
	json-formatter \
	compatibility-kit \
	react \
	html-formatter \
	datatable \
	config \
	demo-formatter

default: .rsynced $(patsubst %,default-%,$(PACKAGES))
.PHONY: default

default-%: %
	cd $< && make default

update-dependencies: $(patsubst %,update-dependencies-%,$(PACKAGES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies

clean: $(patsubst %,clean-%,$(PACKAGES))
	rm -f .rsynced
.PHONY: clean

clean-%: %
	cd $< && make clean

ci: check_synced push_subrepos default

check_synced: .rsynced
	[[ -z $$(git status -s) ]] || (echo "Working copy is dirty. Please run `source scripts/functions.sh && rsync_files` and commit modified files." && exit 1)
.PHONY: check_synced

push_subrepos:
	source scripts/functions.sh && push_subrepos .
.PHONY: push_subrepos

.rsynced:
	source scripts/functions.sh && rsync_files
	touch $@
