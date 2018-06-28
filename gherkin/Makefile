MAKEFILES=java/Makefile javascript/Makefile ruby/Makefile
# Disable build of go,dotnet,c,objective-c,perl,python until they
# implement:
# - https://github.com/cucumber/cucumber/pull/353
# - https://github.com/cucumber/cucumber/pull/416
# MAKEFILES=$(wildcard */Makefile)

default: $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
