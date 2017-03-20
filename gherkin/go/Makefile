SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

GO_SOURCE_FILES = $(shell find . -name "*.go") parser.go dialects_builtin.go

export GOPATH = $(realpath ./)

all: .compared

.compared: .built $(TOKENS) $(ASTS) $(PICKLES) $(SOURCES) $(ERRORS)
	touch $@

.built: show-version-info $(GO_SOURCE_FILES) bin/gherkin-generate-tokens bin/gherkin
	go test -race
	go vet
	touch $@

show-version-info:
	go version

bin/gherkin-generate-tokens: $(GO_SOURCE_FILES)
	go build -o $@ ./gherkin-generate-tokens

bin/gherkin: $(GO_SOURCE_FILES)
	go build -o $@ ./cli

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens bin/gherkin-generate-tokens
	mkdir -p `dirname $@`
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@
.DELETE_ON_ERROR: acceptance/testdata/%.feature.tokens

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-pickles $< | jq --sort-keys "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.ast.ndjson

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.errors.ndjson

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-ast --no-pickles $< | jq --sort-keys "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.source.ndjson

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-ast $< | jq --sort-keys "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.pickles.ndjson

parser.go: gherkin.berp parser.go.razor berp/berp.exe
	mono berp/berp.exe -g gherkin.berp -t parser.go.razor -o $@
	# Remove BOM
	tail -c +4 $@ > $@.nobom
	mv $@.nobom $@
	gofmt -w $@

dialects_builtin.go: gherkin-languages.json dialects_builtin.go.jq
	cat $< | jq --sort-keys --from-file dialects_builtin.go.jq --raw-output --compact-output > $@
	gofmt -w $@

clean:
	rm -rf .compared .built acceptance bin/ parser.go dialects_builtin.go
.PHONY: clean show-version-info
