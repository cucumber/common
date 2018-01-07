SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

SRC_FILES= $(shell find src -name "*.[ch]*")

ifeq ($(CC),i686-w64-mingw32-gcc)
	GHERKIN=bin/gherkin.exe
	RUN_GHERKIN=wine $(GHERKIN)
	GHERKIN_GENERATE_TOKENS=bin/gherkin_generate_tokens.exe
	RUN_GHERKIN_GENERATE_TOKENS=wine $(GHERKIN_GENERATE_TOKENS)
else
	GHERKIN=bin/gherkin
	RUN_GHERKIN=$(GHERKIN)
	GHERKIN_GENERATE_TOKENS=bin/gherkin_generate_tokens
	RUN_GHERKIN_GENERATE_TOKENS=$(GHERKIN_GENERATE_TOKENS)
endif

.DELETE_ON_ERROR:

default: .compared
.PHONY: default

.compared: .built $(TOKENS) $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES) .run
	touch $@

.built: ./include/rule_type.h src/parser.c src/dialect.c $(SRC_FILES) src/Makefile LICENSE
	$(CC) --version
	cd src; $(MAKE)
	touch $@

clean:
	rm -rf .compared .built .run acceptance
	cd src; $(MAKE) $@
.PHONY: clean

clobber: clean
	rm -rf ./include/rule_type.h src/parser.c src/dialect.c
.PHONY: clobber

cli: ./include/rule_type.h src/parser.c src/dialect.c $(SRC_FILES) src/Makefile
	cd src; $(MAKE) CC=$(CC) $@
.PHONY: libs

libs: ./include/rule_type.h src/parser.c src/dialect.c $(SRC_FILES) src/Makefile
	cd src; $(MAKE) CC=$(CC) $@
.PHONY: libs

libs_so: ./include/rule_type.h src/parser.c src/dialect.c $(SRC_FILES) src/Makefile
	cd src; $(MAKE) CC=$(CC) $@
.PHONY: libs_so

.run: cli $(GHERKIN) $(GOOD_FEATURE_FILES)
	$(RUN_GHERKIN) $(GOOD_FEATURE_FILES) | jq . > /dev/null
	touch .run

./include/rule_type.h: gherkin.berp gherkin-c-rule-type.razor
	mono berp/berp.exe -g gherkin.berp -t gherkin-c-rule-type.razor -o $@
	# Remove BOM
	tail -c +4 $@ > $@.nobom
	mv $@.nobom $@

src/parser.c: gherkin.berp gherkin-c-parser.razor
	mono berp/berp.exe -g gherkin.berp -t gherkin-c-parser.razor -o $@
	# Remove BOM
	tail -c +4 $@ > $@.nobom
	mv $@.nobom $@

src/dialect.c: gherkin-languages.json dialect.c.jq
	cat $< | jq -f dialect.c.jq -r -c > $@

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens $(GHERKIN_GENERATE_TOKENS)
	mkdir -p `dirname $@`
	echo $(RUN_GHERKIN_GENERATE_TOKENS)
	$(RUN_GHERKIN_GENERATE_TOKENS) $< > $@
	diff --strip-trailing-cr --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson $(GHERKIN)
	mkdir -p `dirname $@`
	$(RUN_GHERKIN) --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson $(GHERKIN)
	mkdir -p `dirname $@`
	$(RUN_GHERKIN) --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson $(GHERKIN)
	mkdir -p `dirname $@`
	$(RUN_GHERKIN) --no-source --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .built
	mkdir -p `dirname $@`
	$(RUN_GHERKIN) --no-ast --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)
