include default.mk

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

ASTS         = $(patsubst testdata/%,acceptance/testdata/%.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%,acceptance/testdata/%.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%,acceptance/testdata/%.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%,acceptance/testdata/%.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

.codegen: src/Parser.ts

src/Parser.ts: gherkin.berp gherkin-javascript.razor
	mono /var/lib/berp/1.1.1/tools/net471/Berp.exe -g gherkin.berp -t gherkin-javascript.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@

.tested: .compared

.compared: $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES)
	touch $@

acceptance/testdata/%.ast.ndjson: testdata/% testdata/%.ast.ndjson .built
	mkdir -p $(@D)
	bin/gherkin --no-source --no-pickles --format ndjson --predictable-ids $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.pickles.ndjson: testdata/% testdata/%.pickles.ndjson .built
	mkdir -p $(@D)
	bin/gherkin --no-source --no-ast --format ndjson --predictable-ids $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.source.ndjson: testdata/% testdata/%.source.ndjson .built
	mkdir -p $(@D)
	bin/gherkin --no-ast --no-pickles --format ndjson --predictable-ids $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.errors.ndjson: testdata/% testdata/%.errors.ndjson .built
	mkdir -p $(@D)
	bin/gherkin --no-source --format ndjson --predictable-ids $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

clean:
	rm -rf acceptance
.PHONY: clean
