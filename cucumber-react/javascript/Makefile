include default.mk

FEATURE_FILES = $(wildcard testdata/*.feature)
GHERKIN_DOCUMENT_NDJSON_FILES = $(patsubst testdata/%.feature,testdata/%.ndjson,$(FEATURE_FILES))
ALL_NDJSON_FILE = testdata/all.ndjson

.codegen: $(GHERKIN_DOCUMENT_NDJSON_FILES) $(ALL_NDJSON_FILE)

testdata/%.ndjson: testdata/%.feature
	./node_modules/fake-cucumber/bin/fake-cucumber --predictable-ids --format ndjson $< > $@

$(ALL_NDJSON_FILE): $(FEATURE_FILES)
	./node_modules/fake-cucumber/bin/fake-cucumber --predictable-ids --format ndjson $^ > $@

clean:
	rm -f $(GHERKIN_DOCUMENT_NDJSON_FILES) $(ALL_NDJSON_FILE) $(ALL_PROTOBUF_FILE)
