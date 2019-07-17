# Please update /.templates/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
LIBNAME = $(shell basename $$(pwd))

default: $(patsubst %/Makefile,default-%,$(MAKE_FILES))
.PHONY: default

default-%: %
	cd $< && make default
.PHONY: default-%

update-dependencies: $(patsubst %/Makefile,update-dependencies-%,$(MAKE_FILES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies
.PHONY: update-dependencies-%

update-version: $(patsubst %/Makefile,update-version-%,$(MAKE_FILES))
.PHONY: update-version

update-version-%: %
	cd $< && make update-version
.PHONY: update-version-%

release: update-version publish release-tag
.PHONY: release

publish: $(patsubst %/Makefile,publish-%,$(MAKE_FILES))
.PHONY: publish

publish-%: %
	cd $< && make publish
.PHONY: publish-%

release-tag:
	git commit -am "Release $(LIBNAME) v$(NEW_VERSION)"
	git tag -s "$(LIBNAME)/v$(NEW_VERSION)" -m "Release $(LIBNAME) v$(NEW_VERSION)"
.PHONY: release-tag

clean: $(patsubst %/Makefile,clean-%,$(MAKE_FILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
.PHONY: clean-%
