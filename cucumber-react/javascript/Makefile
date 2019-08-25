include default.mk

FEATURE_FILES = $(wildcard testdata/*.feature)
GHERKIN_DOCUMENT_JSON_FILES = $(patsubst testdata/%.feature,testdata/%.json,$(FEATURE_FILES))
ALL_JSON_FILE = testdata/all.json
ALL_PROTOBUF_FILE = testdata/all.bin

.codegen: $(GHERKIN_DOCUMENT_JSON_FILES) $(ALL_JSON_FILE) $(ALL_PROTOBUF_FILE)

testdata/%.json: testdata/%.feature
	./node_modules/fake-cucumber/bin/fake-cucumber --format json $< > $@

$(ALL_JSON_FILE): $(FEATURE_FILES)
	./node_modules/fake-cucumber/bin/fake-cucumber --format json $^ > $@

$(ALL_PROTOBUF_FILE): $(FEATURE_FILES)
	./node_modules/fake-cucumber/bin/fake-cucumber --format protobuf $^ > $@

clean:
	rm -f $(GHERKIN_DOCUMENT_JSON_FILES) $(ALL_JSON_FILE) $(ALL_PROTOBUF_FILE)
