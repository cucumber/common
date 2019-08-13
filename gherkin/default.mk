# Please update /.templates/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
ALPINE = $(shell which apk 2> /dev/null)
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

post-release: $(patsubst %/Makefile,post-release-%,$(MAKEFILES))
.PHONY: post-release

post-release-%: %
	cd $< && make post-release
.PHONY: post-release-%

post-release: post-release-update-changelog

post-release-update-changelog:
	../scripts/post_release_update_changelog.sh
.PHONY: post-release-update-changelog

release-tag:
	git commit -am "Release $(LIBNAME) v$(NEW_VERSION)"
	git tag -s "$(LIBNAME)/v$(NEW_VERSION)" -m "Release $(LIBNAME) v$(NEW_VERSION)"
.PHONY: release-tag

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
.PHONY: clean-%
