SHELL := /usr/bin/env bash
MAKEFILES=c21e/Makefile \
	cucumber-messages/Makefile \
	gherkin/Makefile \
	cucumber-expressions/Makefile \
	fake-cucumber/Makefile \
	cucumber-query/Makefile \
	cucumber-react/Makefile \
	html-formatter/Makefile \
	cucumber-json-formatter/Makefile \
	datatable/Makefile \
	config/Makefile \
	cucumber-tag-expressions/Makefile \
	cucumber-demo-formatter/Makefile

default: .rsynced $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

update-dependencies: $(patsubst %/Makefile,update-dependencies-%,$(MAKEFILES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES)) rm-release
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

rm-release:
	find . -type d -name '.release' | xargs rm -rf
.PHONY: rm-release
