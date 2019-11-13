include default.mk

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS         = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

default: .compared

.deps: lib/gherkin/parser.rb lib/gherkin/gherkin-languages.json bin/gherkin

.compared: $(TOKENS) $(SOURCES) $(ASTS) $(PICKLES) $(ERRORS)
	touch $@

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens .deps
	mkdir -p `dirname $@`
	bundle exec bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .deps
	mkdir -p `dirname $@`
	bundle exec bin/gherkin --predictable-ids --no-source --no-pickles --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .deps
	mkdir -p `dirname $@`
	bundle exec bin/gherkin --predictable-ids --no-source --no-ast --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .deps
	mkdir -p `dirname $@`
	bundle exec bin/gherkin --predictable-ids --no-ast --no-pickles --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .deps
	mkdir -p `dirname $@`
	bundle exec bin/gherkin --predictable-ids --no-source --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

clean:
	rm -rf .compared acceptance coverage
.PHONY: clean

clobber: clean
	rm -rf lib/gherkin/parser.rb Gemfile.lock
.PHONY: clobber

lib/gherkin/parser.rb: gherkin.berp gherkin-ruby.razor berp/berp.exe
	-mono berp/berp.exe -g gherkin.berp -t gherkin-ruby.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@
