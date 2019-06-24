ALPINE := $(shell which apk 2> /dev/null)
MAKEFILES=$(wildcard */Makefile)

ifndef ALPINE
# Rebuild the docs unless we're already running in the build docker image (running
# docker from docker doesn't work).
default: messages.md
endif

default: $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

messages.md: messages.proto
	docker run --rm -v $$(pwd):/out -v $$(pwd):/protos pseudomuto/protoc-gen-doc --doc_opt=markdown,$@

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean
