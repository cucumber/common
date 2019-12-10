include default.mk

FEATURE_FILES = $(wildcard testdata/*.feature)
GHERKIN_DOCUMENT_JSON_FILES = $(patsubst testdata/%.feature,testdata/%.json,$(FEATURE_FILES))
ALL_JSON_FILE = testdata/all.json

.codegen: $(GHERKIN_DOCUMENT_JSON_FILES) $(ALL_JSON_FILE)

testdata/%.json: testdata/%.feature
	./node_modules/fake-cucumber/bin/fake-cucumber --predictable-ids --format ndjson $< > $@

$(ALL_JSON_FILE): $(FEATURE_FILES)
	./node_modules/fake-cucumber/bin/fake-cucumber --predictable-ids --format ndjson $^ > $@

clean:
	rm -f $(GHERKIN_DOCUMENT_JSON_FILES) $(ALL_JSON_FILE) $(ALL_PROTOBUF_FILE)
