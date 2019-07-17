MAKE_FILES = $(wildcard */Makefile)
include default.mk

EXAMPLES_JSON = $(wildcard examples/*.json)
EXAMPLES_BIN = $(patsubst examples/%.json,examples/%.bin,$(EXAMPLES_JSON))

ifndef ALPINE
# Rebuild the docs unless we're already running in the build docker image (running
# protoc-gen-doc from docker doesn't work because it involves running another docker
# container).
default: messages.md .examples
endif

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

clean: clean-docs

clean-docs:
	cd $< && make clean
	rm -f examples messages.md .examples
.PHONY: clean-docs
