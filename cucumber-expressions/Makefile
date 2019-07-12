# Please update /.templates/Makefile in the cucumber/cucumber monorepo
# and sync:
#
#     source scripts/functions.sh && rsync_files
#
MAKEFILES=$(wildcard */Makefile)

default: $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

update-dependencies: $(patsubst %/Makefile,update-dependencies-%,$(MAKEFILES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies

update-version: $(patsubst %/Makefile,update-version-%,$(MAKEFILES))
.PHONY: update-version

update-version-%: %
	cd $< && make update-version

publish: $(patsubst %/Makefile,publish-%,$(MAKEFILES))
.PHONY: publish

publish-%: %
	cd $< && make publish

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
