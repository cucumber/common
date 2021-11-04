SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

PYTHON_FILES = $(shell find . -name "*.py")
PYTHONPATH ?= $(PWD)
export PYTHONPATH

.DELETE_ON_ERROR:

default: .built .compared
.PHONY: all

.compared: $(TOKENS) $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES)
	touch $@

.built: gherkin/parser.py gherkin/gherkin-languages.json $(PYTHON_FILES) bin/gherkin .pipped
	$(MAKE) test
	touch $@

.PHONY: test
test: gherkin/parser.py
	# "pytest" is most likely installed in $(HOME)/.local/bin since normal
	# site-packages most likely is not writeable
	@echo "$(@): USE PYTHONPATH=$(PYTHONPATH)"
	PATH=$(PATH):$(HOME)/.local/bin pytest

.pipped:
	pip install -r requirements.txt
	touch $@

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens
	mkdir -p $(@D)
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson
	mkdir -p $(@D)
	bin/gherkin --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson
	mkdir -p $(@D)
	bin/gherkin --no-source --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson
	mkdir -p $(@D)
	bin/gherkin --no-ast --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson
	mkdir -p $(@D)
	bin/gherkin --no-source $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

clean:
	rm -rf .compared .built .pipped acceptance
.PHONY: clean

clobber: clean
	rm -rf gherkin/parser.py
.PHONY: clobber

gherkin/parser.py: gherkin-python.razor gherkin.berp
	$(berp-generate-parser)

include default.mk
