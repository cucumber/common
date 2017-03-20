MAKEFILES=$(wildcard */Makefile)

all: install

install: $(patsubst %/Makefile,install-%,$(MAKEFILES))
.PHONY: all

install-%: %
	cd $< && make install

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
