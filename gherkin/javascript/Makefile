SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

JAVASCRIPT_FILES = $(shell find lib -name "*.js") index.js

.DELETE_ON_ERROR:

default: .compared
	yarn link
.PHONY: all

.compared: .built $(TOKENS) $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES)
	touch $@

.built: lib/gherkin/parser.js lib/gherkin/gherkin-languages.json $(JAVASCRIPT_FILES) dist/gherkin.js dist/gherkin.min.js yarn.lock
	./node_modules/.bin/mocha 'test/**/*.js'
	touch $@

yarn.lock: package.json
	yarn install --network-concurrency 1

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens .built
	mkdir -p `dirname $@`
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-ast --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-source $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

lib/gherkin/parser.js: gherkin.berp gherkin-javascript.razor berp/berp.exe
	-mono berp/berp.exe -g gherkin.berp -t gherkin-javascript.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@

dist/gherkin.js: lib/gherkin/parser.js $(JAVASCRIPT_FILES) lib/gherkin/gherkin-languages.json LICENSE yarn.lock
	mkdir -p `dirname $@`
	echo '/*' > $@
	cat LICENSE >> $@
	echo '*/' >> $@
	./node_modules/.bin/browserify index.js >> $@

dist/gherkin.min.js: dist/gherkin.js yarn.lock
	mkdir -p `dirname $@`
	echo '/*' > $@
	cat LICENSE >> $@
	echo '*/' >> $@
	./node_modules/.bin/uglifyjs $< >> $@

clean:
	rm -rf .compared .built acceptance dist
.PHONY: clean

clobber: clean
	rm -rf lib/gherkin/parser.js yarn.lock
.PHONY: clobber
