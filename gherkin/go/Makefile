include default.mk

GHERKIN_DIALECTS := $(shell cat gherkin-languages.json | jq --compact-output --sort-keys . | base64 | tr -d '\n')
GOX_LDFLAGS := "-X main.version=${TRAVIS_TAG} -X main.gherkinDialects=${GHERKIN_DIALECTS}"

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS         = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

default: .compared

.deps:
	go get github.com/aslakhellesoy/gox
	touch $@

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
	go build -o $@ ./cmd

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens bin/gherkin-generate-tokens
	mkdir -p `dirname $@`
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson bin/gherkin
	mkdir -p `dirname $@`
	bin/gherkin --json --no-source --no-pickles $< | jq --sort-keys --compact-output -f remove_empty.jq > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

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
	# We're allowing mono to fail. The monorepo build runs in a docker image which
	# doesn't have mono installed. This looks like it will be fixed post Alpine 3.9:
	# https://pkgs.alpinelinux.org/packages?name=mono&branch=edge
	-mono berp/berp.exe -g gherkin.berp -t parser.go.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@
	gofmt -w $@

dialects_builtin.go: gherkin-languages.json dialects_builtin.go.jq
	cat $< | jq --sort-keys --from-file dialects_builtin.go.jq --raw-output --compact-output > $@
	gofmt -w $@

clean:
	rm -rf .compared .built acceptance bin/ dist/* dist_compressed/ .dist .dist-compressed
