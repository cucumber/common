# Please update /.templates/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
MAKEFILES = $(wildcard */Makefile)
LIBNAME = $(shell basename $$(pwd))

default: $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default
.PHONY: default-%

update-dependencies: $(patsubst %/Makefile,update-dependencies-%,$(MAKEFILES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies
.PHONY: update-dependencies-%

update-version: $(patsubst %/Makefile,update-version-%,$(MAKEFILES))
.PHONY: update-version

update-version-%: %
	cd $< && make update-version
.PHONY: update-version-%

release: update-version publish release-tag
.PHONY: release

publish: $(patsubst %/Makefile,publish-%,$(MAKEFILES))
.PHONY: publish

publish-%: %
	cd $< && make publish
.PHONY: publish-%

release-tag:
	git commit -am "Release $(LIBNAME) v$(NEW_VERSION)"
	git tag -s "$(LIBNAME)/v$(NEW_VERSION)" -m "Release $(LIBNAME) v$(NEW_VERSION)"
.PHONY: release-tag

post-release-update-changelog:
	../scripts/update_changelog_post_release.sh
.PHONY: post-release-update-changelog

post-release-update-pomxml:
	../scripts/update_pomxml_after_release.sh
.PHONY: post-release-pomxml

post-release: post-release-update-changelog post-release-update-pomxml
.PHONY: post-release

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
.PHONY: clean-%
