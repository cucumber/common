include default.mk

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature" -o -name "*.feature.md")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature" -o -name "*.feature.md")

ASTS         = $(patsubst testdata/%,acceptance/testdata/%.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%,acceptance/testdata/%.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%,acceptance/testdata/%.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%,acceptance/testdata/%.errors.ndjson,$(BAD_FEATURE_FILES))

GHERKIN = scripts/gherkin.sh

.DELETE_ON_ERROR:

.codegen: src/Parser.ts

src/Parser.ts: gherkin-javascript.razor gherkin.berp
	$(berp-generate-parser)

.tested: .compared

.compared: $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES)
	touch $@

acceptance/testdata/%.ast.ndjson: testdata/% testdata/%.ast.ndjson
	mkdir -p $(@D)
	$(GHERKIN) --no-source --no-pickles --predictable-ids $< | jq --sort-keys --compact-output "." > $@
ifndef GOLDEN
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)
else
	cp $@ ../$(word 2,$^)
endif

acceptance/testdata/%.pickles.ndjson: testdata/% testdata/%.pickles.ndjson
	mkdir -p $(@D)
	$(GHERKIN) --no-source --no-ast --predictable-ids $< | jq --sort-keys --compact-output "." > $@
ifndef GOLDEN
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)
else
	cp $@ ../$(word 2,$^)
endif

acceptance/testdata/%.source.ndjson: testdata/% testdata/%.source.ndjson
	mkdir -p $(@D)
	$(GHERKIN) --no-ast --no-pickles --predictable-ids $< | jq --sort-keys --compact-output "." > $@
ifndef GOLDEN
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)
else
	cp $@ ../$(word 2,$^)
endif

acceptance/testdata/%.errors.ndjson: testdata/% testdata/%.errors.ndjson
	mkdir -p $(@D)
	$(GHERKIN) --no-source --predictable-ids $< | jq --sort-keys --compact-output "." > $@
ifndef GOLDEN
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)
else
	cp $@ ../$(word 2,$^)
endif

clean:
	rm -rf acceptance
.PHONY: clean
