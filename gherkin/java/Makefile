SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES    = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES    = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

JAVA_FILES = $(shell find . -name "*.java")

.DELETE_ON_ERROR:

default: .compared
.PHONY: default

.compared: $(TOKENS) $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES)
	touch $@

.built: src/main/java/gherkin/Parser.java src/main/resources/gherkin/gherkin-languages.json $(JAVA_FILES) LICENSE pom.xml
	mvn install
	touch $@

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens .built
	mkdir -p `dirname $@`
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@
.DELETE_ON_ERROR: acceptance/testdata/%.feature.tokens

# Generate
# acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $<.ast.ndjson
# .DELETE_ON_ERROR: acceptance/testdata/%.feature.ast.ndjson

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

# Generate
# acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-source --no-ast $< | jq --sort-keys --compact-output "." > $<.pickles.ndjson
# .DELETE_ON_ERROR: testdata/%.feature.pickles.ndjson

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

# Generate
# acceptance/testdata/%.feature.source.ndjson: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-ast --no-pickles $< | jq --sort-keys --compact-output "." > $<.source.ndjson
# .DELETE_ON_ERROR: acceptance/testdata/%.feature.source.ndjson

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-ast --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

# Generate
# acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	bin/gherkin $< | jq --sort-keys --compact-output "." > $<.errors.ndjson
# .DELETE_ON_ERROR: acceptance/testdata/%.feature.ndjson

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

src/main/java/gherkin/Parser.java: gherkin.berp gherkin-java.razor berp/berp.exe
	-mono berp/berp.exe -g gherkin.berp -t gherkin-java.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@

clean:
	rm -rf .compared .built acceptance target
.PHONY: clean

clobber: clean
	rm -rf src/main/java/gherkin/Parser.java
.PHONY: clobber
