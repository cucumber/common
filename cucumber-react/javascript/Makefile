include default.mk

# Determine if we're on linux or osx (ignoring other OSes as we're not building on them)
OS := $(shell [[ "$$(uname)" == "Darwin" ]] && echo "darwin" || echo "linux")
# Determine if we're on 386 or amd64 (ignoring other processors as we're not building on them)
ARCH := $(shell [[ "$$(arch)" == "x86_64" ]] && echo "amd64" || echo "386")

FEATURE_FILES = $(wildcard testdata/*.feature)
GHERKIN_DOCUMENT_JSON_FILES = $(patsubst testdata/%.feature,testdata/%.json,$(FEATURE_FILES))
ALL_JSON_FILE = testdata/all.json

.codegen: $(GHERKIN_DOCUMENT_JSON_FILES) $(ALL_JSON_FILE)

testdata/%.json: testdata/%.feature
	./node_modules/fake-cucumber/bin/fake-cucumber $< > $@

$(ALL_JSON_FILE): $(FEATURE_FILES)
	./node_modules/fake-cucumber/bin/fake-cucumber $^ > $@

.codegen: $(GHERKIN_DOCUMENT_JSON_FILES)

clean:
	rm -f $(GHERKIN_DOCUMENT_JSON_FILES) $(ALL_JSON_FILE)
