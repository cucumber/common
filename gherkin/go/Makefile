SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS         = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
PROTOBUFS    = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.protobuf.bin.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

GO_SOURCE_FILES = $(shell find . -name "*.go")

export GOPATH = $(realpath ./)

.DELETE_ON_ERROR:

default: .compared
.PHONY: default

skip_build:
	@echo -e "\x1b[31;01mSKIPPING GHERKIN GO BUILD ON ALPINE\x1b[0m"
.PHONY: skip_build

.compared: .built $(PROTOBUFS) $(TOKENS) $(ASTS) $(PICKLES) $(SOURCES) $(ERRORS)
	touch $@

.built: show-version-info $(GO_SOURCE_FILES) bin/gherkin-generate-tokens bin/gherkin
	go vet
	touch $@

show-version-info:
	go version
PHONY: show-version-info

bin/gherkin-generate-tokens: $(GO_SOURCE_FILES) parser.go dialects_builtin.go
	go build -o $@ ./gherkin-generate-tokens

bin/gherkin: $(GO_SOURCE_FILES) parser.go dialects_builtin.go
	go build -o $@ ./cli

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens bin/gherkin-generate-tokens
	mkdir -p `dirname $@`
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-pickles $< | jq --sort-keys "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.protobuf.bin.ndjson: testdata/%.feature.protobuf.bin bin/gherkin
	mkdir -p `dirname $@`
	cat $< | bin/gherkin | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-source $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-ast --no-pickles $< | jq --sort-keys "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-ast $< | jq --sort-keys "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

parser.go: gherkin.berp parser.go.razor berp/berp.exe
	-mono berp/berp.exe -g gherkin.berp -t parser.go.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@
	gofmt -w $@

dialects_builtin.go: gherkin-languages.json dialects_builtin.go.jq
	cat $< | jq --sort-keys --from-file dialects_builtin.go.jq --raw-output --compact-output > $@
	gofmt -w $@

clean:
	rm -rf .compared .built acceptance bin/
.PHONY: clean

clobber: clean
	rm -rf parser.go dialects_builtin.go
.PHONY: clobber
