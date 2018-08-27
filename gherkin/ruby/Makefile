include default.mk

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

ASTS         = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

default: .compared

.deps:
	./scripts/s3-download gherkin-go $(LIBRARY_VERSION)
	touch $@

.compared: $(ERRORS) $(SOURCES) $(PICKLES) $(PROTOBUFS) $(ASTS)
	touch $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .deps
	mkdir -p `dirname $@`
	bundle exec bin/gherkin --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .deps
	mkdir -p `dirname $@`
	bundle exec bin/gherkin --no-source --no-ast $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .deps
	mkdir -p `dirname $@`
	bundle exec bin/gherkin --no-ast --no-pickles $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .deps
	mkdir -p `dirname $@`
	bundle exec bin/gherkin --no-source $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

clean:
	rm -rf .compared acceptance gherkin-go
