include default.mk

# Determine if we're on linux or osx (ignoring other OSes as we're not building on them)
OS := $(shell [[ "$$(uname)" == "Darwin" ]] && echo "darwin" || echo "linux")
# Determine if we're on 386 or amd64 (ignoring other processors as we're not building on them)
ARCH := $(shell [[ "$$(arch)" == "x86_64" ]] && echo "amd64" || echo "386")
GHERKIN_EXE = ../../gherkin/go/dist/gherkin-$(OS)-$(ARCH)

FEATURE_FILES = $(wildcard testdata/*.feature)
GHERKIN_DOCUMENT_JSON_FILES = $(patsubst testdata/%.feature,testdata/%.json,$(FEATURE_FILES))

gherkin_document_json_files: $(GHERKIN_DOCUMENT_JSON_FILES)

testdata/%.json: testdata/%.feature
	$(GHERKIN_EXE) --no-pickles --no-source --json $< > $@
	