SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

SRC_FILES= $(shell find src -name "*.[ch]*")

all: .compared
.PHONY: all

.compared: .built $(TOKENS) $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES) .run
	touch $@

.built: ./include/rule_type.h src/parser.c src/dialect.c $(SRC_FILES) src/Makefile LICENSE
	cd src; $(MAKE)
	touch $@

clean:
	rm -rf .compared .built .run acceptance ./include/rule_type.h src/parser.c src/dialect.c
	cd src; $(MAKE) $@
.PHONY: clean

cli: ./include/rule_type.h src/parser.c src/dialect.c $(SRC_FILES) src/Makefile
	cd src; $(MAKE) $@
.PHONY: libs

libs: ./include/rule_type.h src/parser.c src/dialect.c $(SRC_FILES) src/Makefile
	cd src; $(MAKE) $@
.PHONY: libs

.run: bin/gherkin $(GOOD_FEATURE_FILES)
	bin/gherkin --no-source --no-ast --no-pickles $(GOOD_FEATURE_FILES)
	touch .run

./include/rule_type.h: ../gherkin.berp gherkin-c-rule-type.razor ../bin/berp.exe
	mono ../bin/berp.exe -g ../gherkin.berp -t gherkin-c-rule-type.razor -o $@
	# Remove BOM
	tail -c +4 $@ > $@.nobom
	mv $@.nobom $@

src/parser.c: ../gherkin.berp gherkin-c-parser.razor ../bin/berp.exe
	mono ../bin/berp.exe -g ../gherkin.berp -t gherkin-c-parser.razor -o $@
	# Remove BOM
	tail -c +4 $@ > $@.nobom
	mv $@.nobom $@

src/dialect.c: ../gherkin-languages.json dialect.c.jq
	$(MAKE) update-gherkin-languages

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens bin/gherkin_generate_tokens
	mkdir -p `dirname $@`
	bin/gherkin_generate_tokens $< > $@
	diff --unified $<.tokens $@
.DELETE_ON_ERROR: acceptance/testdata/%.feature.tokens

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.ast.ndjson

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.errors.ndjson

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.pickles.ndjson

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-ast --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)
.DELETE_ON_ERROR: acceptance/testdata/%.feature.source.ndjson

update-gherkin-languages: src/dialect.c.tmp
	diff -q src/dialect.c.tmp src/dialect.c || mv src/dialect.c.tmp src/dialect.c
.PHONY: update-gherkin-languages

src/dialect.c.tmp: ../gherkin-languages.json dialect.c.jq
	cat $< | jq -f dialect.c.jq -r -c > $@
.INTERMEDIATE: src/dialect.c.tmp

LICENSE: ../LICENSE
	cp $< $@
