SHELL := /usr/bin/env bash
MAKE_FILES=c21e/Makefile \
	cucumber-messages/Makefile \
	gherkin/Makefile \
	fake-cucumber/Makefile \
	cucumber-react/Makefile \
	html-formatter/Makefile \
	datatable/Makefile \
	config/Makefile \
	cucumber-expressions/Makefile \
	tag-expressions/Makefile \
	json-formatter/Makefile \
	dots-formatter/Makefile

default: .rsynced $(patsubst %/Makefile,default-%,$(MAKE_FILES))
.PHONY: default

default-%: %
	cd $< && make default

update-dependencies: $(patsubst %/Makefile,update-dependencies-%,$(MAKE_FILES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies

clean: $(patsubst %/Makefile,clean-%,$(MAKE_FILES)) rm-release
	rm -f .rsynced
.PHONY: clean

clean-%: %
	cd $< && make clean

ci: check_synced push_subrepos default

check_synced: .rsynced
	[[ -z $$(git status -s) ]] || (echo "Working copy is dirty" && exit 1)
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
