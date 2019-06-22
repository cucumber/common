ALPINE := $(shell which apk 2> /dev/null)
MAKE_FILES=$(wildcard */Makefile)

EXAMPLES_JSON = $(wildcard examples/*.json)
EXAMPLES_BIN = $(patsubst examples/%.json,examples/%.bin,$(EXAMPLES_JSON))

default: $(patsubst %/Makefile,default-%,$(MAKE_FILES))
.PHONY: default

ifndef ALPINE
# Rebuild the docs unless we're already running in the build docker image (running
# protoc-gen-doc from docker doesn't work because it involves running another docker
# container).
default: messages.md .examples
endif

default-%: %
	cd $< && make default

messages.md: messages.proto
	docker run --rm -v $$(pwd):/out -v $$(pwd):/protos pseudomuto/protoc-gen-doc --doc_opt=markdown,$@

messages.json: messages.proto
	docker run --rm -v $$(pwd):/out -v $$(pwd):/protos pseudomuto/protoc-gen-doc --doc_opt=json,$@

.examples: messages.json
	./generate-examples.rb
	make examples-bin
	touch $@

examples-bin: $(EXAMPLES_BIN)
.PHONY: examples-bin

examples/%.bin: examples/%.json
	cat $< | ruby -I ruby/lib ./json2protobuf.rb > $@

clean: $(patsubst %/Makefile,clean-%,$(MAKE_FILES))
	rm -rf examples
.PHONY: clean

clean-%: %
	cd $< && make clean
	rm -f messages.md .examples
