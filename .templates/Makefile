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

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
