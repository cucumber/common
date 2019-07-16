ALPINE := $(shell which apk 2> /dev/null)
MAKEFILES=$(wildcard */Makefile)
LIBNAME := $(shell basename $$(pwd))

ifndef ALPINE
# Rebuild the docs unless we're already running in the build docker image (running
# docker from docker doesn't work).
default: messages.md
endif

messages.md: messages.proto
	docker run --rm -v $$(pwd):/out -v $$(pwd):/protos pseudomuto/protoc-gen-doc --doc_opt=markdown,$@

default: $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

update-dependencies: $(patsubst %/Makefile,update-dependencies-%,$(MAKEFILES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies

update-version: $(patsubst %/Makefile,update-version-%,$(MAKEFILES))
.PHONY: update-version

update-version-%: %
	cd $< && make update-version

release-tag:
	git commit -am "Release $(LIBNAME) v$(NEW_VERSION)"
	git tag -s "$(LIBNAME)/v$(NEW_VERSION)" -m "Release $(LIBNAME) v$(NEW_VERSION)"
.PHONY: release-tag

release: update-version publish release-tag
.PHONY: release

publish: $(patsubst %/Makefile,publish-%,$(MAKEFILES))
.PHONY: publish

publish-%: %
	cd $< && make publish

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
