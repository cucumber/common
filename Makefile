MAKEFILES=event-protocol/Makefile \
          gherkin/Makefile \
					event-protocol/Makefile \
					cucumber-expressions/Makefile \
					tag-expressions/Makefile \
					cucumber-redux/Makefile \
					cucumber-react/Makefile

RSYNC_FILES=$(shell find . -type f -name '*.rsync')

default: .rsynced $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean

.rsynced: $(RSYNC_FILES)
	source scripts/functions.sh && rsync_files
	touch $@
