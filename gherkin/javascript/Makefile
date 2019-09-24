include default.mk

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

ASTS         = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

.deps: executables

.codegen: src/Parser.ts

src/Parser.ts: gherkin.berp gherkin-javascript.razor berp/berp.exe
	# We're allowing mono to fail. The monorepo build runs in a docker image which
	# doesn't have mono installed. This looks like it will be fixed post Alpine 3.9:
	# https://pkgs.alpinelinux.org/packages?name=mono&branch=edge
	-mono berp/berp.exe -g gherkin.berp -t gherkin-javascript.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@

executables:
	cp -R "$$(pwd)/../go/dist" $@

.tested: .compared

.compared: $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES)
	touch $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .deps
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-pickles --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .deps
	mkdir -p `dirname $@`
	bin/gherkin --no-source --no-ast --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson .deps
	mkdir -p `dirname $@`
	bin/gherkin --no-ast --no-pickles --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .deps
	mkdir -p `dirname $@`
	bin/gherkin --no-source --json $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

clean:
	rm -rf acceptance executables
.PHONY: clean
