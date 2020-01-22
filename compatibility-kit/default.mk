# Please update /.templates/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
SHELL := /usr/bin/env bash
ALPINE = $(shell which apk 2> /dev/null)
LIBNAME = $(shell basename $$(pwd))
LANGUAGES ?= $(wildcard */)

default: $(patsubst %,default-%,$(LANGUAGES))
.PHONY: default

default-%: %
	[[ -d $< ]] && cd $< && make default || true
.PHONY: default-%

# Need to declare these phonies to avoid errors for packages without a particular language
.PHONY: c dotnet go java javascript objective-c perl python ruby

update-dependencies: $(patsubst %,update-dependencies-%,$(LANGUAGES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies
.PHONY: update-dependencies-%

update-changelog:
ifdef NEW_VERSION
	cat CHANGELOG.md | ../scripts/update_changelog.sh $(NEW_VERSION) > CHANGELOG.md.tmp
	mv CHANGELOG.md.tmp CHANGELOG.md
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-changelog

pre-release: update-changelog $(patsubst %,pre-release-%,$(LANGUAGES))
.PHONY: pre-release

pre-release-%: %
	[[ -d $< ]] && cd $< && make pre-release || true
.PHONY: pre-release-%

release: create-and-push-release-tag publish
.PHONY: release

publish: $(patsubst %,publish-%,$(LANGUAGES))
.PHONY: publish

publish-%: %
	[[ -d $< ]] && cd $< && make publish || true
.PHONY: publish-%

create-and-push-release-tag:
	git commit -am "Release $(LIBNAME) v$(NEW_VERSION)"
	git tag -s "$(LIBNAME)/v$(NEW_VERSION)" -m "Release $(LIBNAME) v$(NEW_VERSION)"
	git push --tags
.PHONY: create-and-push-release-tag

post-release: $(patsubst %,post-release-%,$(LANGUAGES))
.PHONY: post-release

post-release: commit-and-push-post-release

post-release-%: %
	[[ -d $< ]] && cd $< && make post-release || true
.PHONY: post-release-%

commit-and-push-post-release:
ifdef NEW_VERSION
	git push --tags
	git commit -am "Post release $(LIBNAME) v$(NEW_VERSION)" 2> /dev/null || true
	git push
else
	@echo -e "\033[0;31mNEW_VERSION is not defined.\033[0m"
	exit 1
endif
.PHONY: commit-and-push-post-release

clean: $(patsubst %,clean-%,$(LANGUAGES))
.PHONY: clean

clean-%: %
	[[ -d $< ]] && cd $< && make clean || true
.PHONY: clean-%
