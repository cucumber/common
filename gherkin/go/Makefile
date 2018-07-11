include default.mk

GHERKIN_DIALECTS := $(shell cat gherkin-languages.json | jq --compact-output --sort-keys . | base64 | tr -d '\n')
EXES := $(shell find dist -name 'gherkin-*')
UPX_EXES = $(patsubst dist/gherkin-%,dist_compressed/gherkin-%,$(EXES))

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS         = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
PROTOBUFS    = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.protobuf.bin.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

default: .compared

.deps:
	go get github.com/cucumber/cucumber-messages-go
	# Using aslakhellesoy's fork until this is merged:
	# https://github.com/mitchellh/gox/pull/112
	go get github.com/aslakhellesoy/gox
	touch $@

.dist: .compared .deps
	gox -ldflags "-X main.version=${CIRCLE_TAG} -X main.gherkinDialects=${GHERKIN_DIALECTS}" -output "dist/gherkin-{{.OS}}-{{.Arch}}" -rebuild ./cli
	touch $@

dist/gherkin-%: .dist

.dist-compressed: $(UPX_EXES)
	touch $@

dist_compressed/gherkin-%: dist/gherkin-%
	mkdir -p dist_compressed
	# requires upx in PATH to compress supported binaries
	# may produce an error ARCH not supported
	-upx $< -o $@

	# Test the integrity
	if [ -f "$@" ]; then upx -t $@ || rm $@; fi

.compared: .built $(TOKENS) $(ASTS) $(PICKLES) $(SOURCES) $(ERRORS)
	touch $@

.built: bin/gherkin-generate-tokens bin/gherkin
	touch $@

.tested: parser.go dialects_builtin.go

bin/gherkin-generate-tokens: .deps $(GO_SOURCE_FILES) parser.go dialects_builtin.go
	go build -o $@ ./gherkin-generate-tokens

bin/gherkin: .deps $(GO_SOURCE_FILES) parser.go dialects_builtin.go
	# We're building without -ldflags because it fails on Alpine Linux. This binary
	# is for testing only and won't be released. The cross-compiled binaries are built
	# on Travis' standard linux where this is not an issue.
	go build -o $@ ./cli

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens bin/gherkin-generate-tokens
	mkdir -p `dirname $@`
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --json --no-source --no-pickles $< | jq --sort-keys --compact-output -f remove_empty.jq > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.protobuf.bin.ndjson: testdata/%.feature.protobuf.bin bin/gherkin
	mkdir -p `dirname $@`
	cat $< | bin/gherkin | jq --sort-keys --compact-output -f remove_empty.jq > $@
	diff --unified <(jq "." $<.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --json --no-source $< | jq --sort-keys --compact-output -f remove_empty.jq > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --json --no-ast --no-pickles $< | jq --sort-keys -f remove_empty.jq > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --json --no-source --no-ast $< | jq --sort-keys -f remove_empty.jq > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

parser.go: gherkin.berp parser.go.razor berp/berp.exe
	-mono berp/berp.exe -g gherkin.berp -t parser.go.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@
	gofmt -w $@

dialects_builtin.go: gherkin-languages.json dialects_builtin.go.jq
	cat $< | jq --sort-keys --from-file dialects_builtin.go.jq --raw-output --compact-output > $@
	gofmt -w $@

clean: clean_custom

clean_custom:
	rm -rf .compared .built acceptance bin/ dist/* dist_compressed/ .dist .dist-compressed
.PHONY: clean_custom