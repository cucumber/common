include default.mk

FEATURE_FILES = $(wildcard testdata/*.feature)
GHERKIN_DOCUMENT_NDJSON_FILES = $(patsubst testdata/%.feature,testdata/%.ndjson,$(FEATURE_FILES))
ALL_NDJSON_FILE = testdata/all.ndjson

.codegen: $(GHERKIN_DOCUMENT_NDJSON_FILES) $(ALL_NDJSON_FILE) dist/src/styles/cucumber-react.css

dist/src/styles/cucumber-react.css: src/styles/styles.scss src/styles/react-accessible-accordion.css
	mkdir -p $$(dirname $@)
	./node_modules/.bin/sass $< > $@
	cat src/styles/react-accessible-accordion.css >> $@

testdata/%.ndjson: testdata/%.feature
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber --predictable-ids --format ndjson $< > $@

$(ALL_NDJSON_FILE): $(FEATURE_FILES)
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber --predictable-ids --format ndjson $^ > $@

.tested: .tested-storybook

.tested-storybook:
	./node_modules/.bin/build-storybook
	touch $@

clean:
	rm -f $(GHERKIN_DOCUMENT_NDJSON_FILES) $(ALL_NDJSON_FILE) $(ALL_PROTOBUF_FILE)
