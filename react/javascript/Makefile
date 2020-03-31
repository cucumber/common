include default.mk
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

FEATURE_FILES = $(wildcard testdata/*.feature)
GHERKIN_DOCUMENT_NDJSON_FILES = $(patsubst testdata/%.feature,testdata/%.ndjson,$(FEATURE_FILES))
ALL_NDJSON_FILE = testdata/all.ndjson

CCK_FEATURE_FILES=$(call rwildcard,../../compatibility-kit/javascript/features,*.feature)
CCK_NDJSON =  $(patsubst ../../compatibility-kit/javascript/features/%.feature,cck-testdata/%.ndjson,$(CCK_FEATURE_FILES))

.codegen: $(GHERKIN_DOCUMENT_NDJSON_FILES) $(ALL_NDJSON_FILE) $(CCK_NDJSON) dist/src/styles/cucumber-react.css

dist/src/styles/cucumber-react.css: src/styles/styles.scss src/styles/react-accessible-accordion.css
	mkdir -p $(@D)
	./node_modules/.bin/sass $< > $@
	cat src/styles/react-accessible-accordion.css >> $@

cck-testdata/%.ndjson: ../../compatibility-kit/javascript/features/%.feature
	mkdir -p $(@D)
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber --predictable-ids --format ndjson $< > $@

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
