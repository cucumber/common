SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

ASTS         = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
PROTOBUFBINS = $(patsubst testdata/%.feature,testdata/%.feature.protobuf.bin,$(GOOD_FEATURE_FILES))
PROTOBUFS    = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.protobuf.bin.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

JAVA_FILES = $(shell find . -name "*.java")

ifdef TRAVIS_TAG
	DOWNLOAD_BINARIES_TARGET=gherkin-go
else
	DOWNLOAD_BINARIES_TARGET=no-gherkin-go
endif

.DELETE_ON_ERROR:

default: .compared
.PHONY: default

.compared: $(PROTOBUFS) $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES)
	touch $@

.built: $(JAVA_FILES) LICENSE pom.xml $(DOWNLOAD_BINARIES_TARGET)
	mvn install
	touch $@

# Downloads the most common platform binaries, which will be included in the jar
# The jar will download other binaries at runtime if they are not bundles
gherkin-go:
	mkdir -p $@
	curl https://s3.eu-west-2.amazonaws.com/io.cucumber/gherkin-go/${TRAVIS_TAG}/gherkin-darwin-amd64      -o gherkin-go/gherkin-darwin-amd64
	curl https://s3.eu-west-2.amazonaws.com/io.cucumber/gherkin-go/${TRAVIS_TAG}/gherkin-darwin-386        -o gherkin-go/gherkin-darwin-386
	curl https://s3.eu-west-2.amazonaws.com/io.cucumber/gherkin-go/${TRAVIS_TAG}/gherkin-linux-amd64       -o gherkin-go/gherkin-linux-amd64
	curl https://s3.eu-west-2.amazonaws.com/io.cucumber/gherkin-go/${TRAVIS_TAG}/gherkin-linux-386         -o gherkin-go/gherkin-linux-386
	curl https://s3.eu-west-2.amazonaws.com/io.cucumber/gherkin-go/${TRAVIS_TAG}/gherkin-windows-amd64.exe -o gherkin-go/gherkin-windows-amd64.exe
	curl https://s3.eu-west-2.amazonaws.com/io.cucumber/gherkin-go/${TRAVIS_TAG}/gherkin-windows-386.exe   -o gherkin-go/gherkin-windows-386.exe

no-gherkin-go:
	echo "Not downloading binaries, because TRAVIS_TAG is not defined"
.PHONY: no-gherkin-go

# # Generate
# acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-source --no-pickles $< | jq --sort-keys --compact-output "." > $<.ast.ndjson

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-pickles --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

# # Generate - we only do this in the Java project, then rsync to others
# testdata/%.feature.protobuf.bin: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	bin/gherkin --protobuf $< > $@

# # Generate
# acceptance/testdata/%.feature.protobuf.bin.ndjson: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	cat $<.protobuf.bin | bin/gherkin | jq --sort-keys --compact-output "." > $<.protobuf.bin.ndjson

acceptance/testdata/%.feature.protobuf.bin.ndjson: testdata/%.feature.protobuf.bin .built
	mkdir -p `dirname $@`
	cat $< | bin/gherkin --json | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ndjson) <(jq "." $@)

# # Generate
# acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-source --no-ast $< | jq --sort-keys --compact-output "." > $<.pickles.ndjson

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-ast --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

# # Generate
# acceptance/testdata/%.feature.source.ndjson: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-ast --no-pickles $< | jq --sort-keys --compact-output "." > $<.source.ndjson

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-ast --no-pickles --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

# # Generate
# acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature .built
# 	mkdir -p `dirname $@`
# 	bin/gherkin --no-source $< | jq --sort-keys --compact-output "." > $<.errors.ndjson

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin --no-source --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

clean:
	rm -rf .compared .built acceptance target gherkin-go
.PHONY: clean
