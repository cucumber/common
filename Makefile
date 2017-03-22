MAKEFILES=event-protocol/Makefile \
          gherkin/Makefile \
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
