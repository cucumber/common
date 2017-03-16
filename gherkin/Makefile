
MAKEFILES=$(wildcard */Makefile)

all: $(patsubst %/Makefile,%/.compared,$(MAKEFILES))
.PHONY: all

%/.compared: % gherkin-languages.json gherkin.berp
	cd $< && make

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean
clean-%: %
	cd $< && make clean
