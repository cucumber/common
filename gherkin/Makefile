MAKEFILES=dotnet/Makefile go/Makefile java/Makefile javascript/Makefile ruby/Makefile
# Temporarily disable build of c,objective-c,perl,python until they
# implement https://github.com/cucumber/cucumber/pull/353
# MAKEFILES=$(wildcard */Makefile)
EVENT_FILES = $(wildcard testdata/**/*.ndjson)

default: $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
