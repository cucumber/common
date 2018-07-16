include default.mk

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

ASTS         = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
PROTOBUFBINS = $(patsubst testdata/%.feature,testdata/%.feature.protobuf.bin,$(GOOD_FEATURE_FILES))
PROTOBUFS    = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.protobuf.bin.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

default: .compared

.deps:
	./scripts/s3-download gherkin-go $(LIBRARY_VERSION)
	touch $@

.compared: $(PROTOBUFS) $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES)
	touch $@

# # Generate
# acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature .tested
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $<.ast.ndjson

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .tested
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-pickles --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

# # Generate - we only do this in the Java project, then rsync to others
# testdata/%.feature.protobuf.bin: testdata/%.feature .tested
# 	mkdir -p `dirname $@`
# 	bin/gherkin --protobuf $< > $@

# # Generate
# acceptance/testdata/%.feature.protobuf.bin.ndjson: testdata/%.feature .tested
# 	mkdir -p `dirname $@`
# 	cat $<.protobuf.bin | bin/gherkin | jq --sort-keys --compact-output "." > $<.protobuf.bin.ndjson

acceptance/testdata/%.feature.protobuf.bin.ndjson: testdata/%.feature.protobuf.bin .tested
	mkdir -p `dirname $@`
	cat $< | bin/gherkin --json | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ndjson) <(jq "." $@)

# # Generate
# acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature .tested
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-source --no-ast $< | jq --sort-keys --compact-output "." > $<.pickles.ndjson

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .tested
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-ast --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

# # Generate
# acceptance/testdata/%.feature.source.ndjson: testdata/%.feature .tested
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-ast --no-pickles $< | jq --sort-keys --compact-output "." > $<.source.ndjson

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .tested
	mkdir -p `dirname $@`
	bin/gherkin --no-ast --no-pickles --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

# # Generate
# acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature .tested
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-source $< | jq --sort-keys --compact-output "." > $<.errors.ndjson

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .tested
	mkdir -p `dirname $@`
	bin/gherkin --no-source --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

clean:
	rm -rf .compared acceptance gherkin-go
