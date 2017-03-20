MAKEFILES=gherkin/Makefile cucumber-expressions/Makefile tag-expressions/Makefile

all: install
.PHONY: all

install: $(patsubst %/Makefile,install-%,$(MAKEFILES))
.PHONY: install

install-%: %
	cd $< && make install

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
