MAKEFILES=go/Makefile java/Makefile javascript/Makefile ruby/Makefile

default: $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

update-dependencies: $(patsubst %/Makefile,update-dependencies-%,$(MAKEFILES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
