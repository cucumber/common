SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find ../testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find ../testdata/bad -name "*.feature")

TOKENS   = $(patsubst ../testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst ../testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst ../testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

M_FILES = $(shell find . -type f \( -iname "*.m" \))

all: .compared
.PHONY: all

.compared: .built $(TOKENS)
#.compared: .built $(TOKENS) $(ASTS) $(ERRORS)
	touch $@

.built: build/AstGenerator build/TokensGenerator LICENSE
	touch $@

acceptance/testdata/%.feature.tokens: ../testdata/%.feature ../testdata/%.feature.tokens .built
	mkdir -p `dirname $@`
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@
.DELETE_ON_ERROR: acceptance/testdata/%.feature.tokens

acceptance/testdata/%.feature.ast.ndjson: ../testdata/%.feature ../testdata/%.feature.ast.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin-generate-ast $< | jq --sort-keys "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.ast.ndjson

acceptance/testdata/%.feature.errors.ndjson: ../testdata/%.feature ../testdata/%.feature.errors.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.errors.ndjson

clean:
	rm -rf .compared .built acceptance Gherkin/GHParser.m Gherkin/GHParser.h gherkin-languages.json
	rm -rf build/
	rm -rf *~
.PHONY: clean

Gherkin/GHParser.h: ../gherkin.berp gherkin-objective-c-header.razor ../bin/berp.exe
	mono ../bin/berp.exe -g ../gherkin.berp -t gherkin-objective-c-header.razor -o $@

Gherkin/GHParser.m: ../gherkin.berp gherkin-objective-c-implementation.razor ../bin/berp.exe
	mono ../bin/berp.exe -g ../gherkin.berp -t gherkin-objective-c-implementation.razor -o $@

build/AstGenerator: Gherkin/GHParser.h Gherkin/GHParser.m $(M_FILES) GherkinLanguages/gherkin-languages.json
	xcodebuild -scheme "AstGenerator" CONFIGURATION_BUILD_DIR=build/

build/TokensGenerator: Gherkin/GHParser.h Gherkin/GHParser.m $(M_FILES) GherkinLanguages/gherkin-languages.json
	xcodebuild -scheme "TokensGenerator" CONFIGURATION_BUILD_DIR=build/

GherkinLanguages/gherkin-languages.json: ../gherkin-languages.json
	cp $< $@

LICENSE: ../LICENSE
	cp $< $@

update-gherkin-languages: GherkinLanguages/gherkin-languages.json
.PHONY: update-gherkin-languages

update-version:
