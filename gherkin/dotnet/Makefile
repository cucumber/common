SHELL := /usr/bin/env bash
ALPINE := $(shell which apk 2> /dev/null)
UNAME := $(shell uname)
ifeq ($(UNAME), Darwin)
	dotnet_build_opts := --framework netcoreapp1.1
endif

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

CS_FILES = $(shell find . -type f \( -iname "*.cs" ! -iname "*.NETFramework*" \))

ifdef ALPINE
	DEFAULT_TARGET=skip_build
else
	DEFAULT_TARGET=.compared
endif

.DELETE_ON_ERROR:

default: $(DEFAULT_TARGET)
.PHONY: default

skip_build:
	@echo -e "\x1b[31;01mSKIPPING GHERKIN .NET BUILD ON ALPINE\x1b[0m"
.PHONY: skip_build

.compared: .sln_built_debug .run_tests $(TOKENS) $(ASTS) $(PICKLES) $(SOURCES) $(ERRORS)
	touch $@

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens .sln_built_debug .run_tests
	mkdir -p `dirname $@`

	bin/gherkin-generate-tokens netcoreapp1.1 $< > $@
	diff --unified $<.tokens $@

	bin/gherkin-generate-tokens net45 $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .sln_built_debug .run_tests
	mkdir -p `dirname $@`

	bin/gherkin netcoreapp1.1 --no-source --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

	bin/gherkin net45 --no-source --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .sln_built_debug .run_tests
	mkdir -p `dirname $@`

	bin/gherkin netcoreapp1.1 --no-pickles --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

	bin/gherkin net45 --no-pickles --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .sln_built_debug .run_tests
	mkdir -p `dirname $@`

	bin/gherkin netcoreapp1.1 --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

	bin/gherkin net45 --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .sln_built_debug .run_tests
	mkdir -p `dirname $@`

	bin/gherkin netcoreapp1.1 --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified $<.errors.ndjson $@

	bin/gherkin net45 --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified $<.errors.ndjson $@

clean:
	rm -rf .compared .built .run_tests acceptance .sln_built_debug
	rm -rf */bin
	rm -rf */obj
	rm -rf */packages
	rm -rf ./output
.PHONY: clean

clobber: clean
	rm -rf Gherkin/Parser.cs
.PHONY: clobber

Gherkin/Parser.cs: gherkin.berp gherkin-csharp.razor berp/berp.exe
	# Some build environments (Travis) mess up timestamps
	# so that all files have the same timestamp, causing make to think this
	# file needs to be rebuilt when it's actually uptodate. Our travis build doesn't
	# have mono, so we'll allow this line to fail.
	-mono berp/berp.exe -g gherkin.berp -t gherkin-csharp.razor -o $@

.sln_built_debug: Gherkin/Parser.cs $(CS_FILES) Gherkin/gherkin-languages.json
	echo "Building on $(UNAME)"

	dotnet restore
	msbuild

	touch $@

.run_tests:

	cd Gherkin.Specs; dotnet xunit -nobuild
	touch $@
