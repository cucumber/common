MAKEFILES=event-protocol/Makefile \
	gherkin/Makefile \
	event-protocol/Makefile \
	cucumber-expressions/Makefile \
	tag-expressions/Makefile \
	cucumber-redux/Makefile \
	cucumber-react/Makefile

default: $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean

.rsynced:
	source scripts/functions.sh && rsync_files
	touch $@

rm-release:
	find . -type d -name '.release' | xargs rm -rf
.PHONY: rm-release
