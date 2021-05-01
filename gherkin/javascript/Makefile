include default.mk

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

ASTS         = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

GHERKIN = scripts/gherkin.sh

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

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson
	mkdir -p $(@D)
	$(GHERKIN) --no-source --no-pickles --predictable-ids $< | jq --sort-keys --compact-output "." > $@
ifndef GOLDEN
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)
else
	cp $@ $(word 2,$^)
endif

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson
	mkdir -p $(@D)
	$(GHERKIN) --no-source --no-ast --predictable-ids $< | jq --sort-keys --compact-output "." > $@
ifndef GOLDEN
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)
else
	cp $@ $(word 2,$^)
endif

acceptance/testdata/%.feature.source.ndjson: testdata/%.feature testdata/%.feature.source.ndjson
	mkdir -p $(@D)
	$(GHERKIN) --no-ast --no-pickles --predictable-ids $< | jq --sort-keys --compact-output "." > $@
ifndef GOLDEN
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)
else
	cp $@ $(word 2,$^)
endif

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson
	mkdir -p $(@D)
	$(GHERKIN) --no-source --predictable-ids $< | jq --sort-keys --compact-output "." > $@
ifndef GOLDEN
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)
else
	cp $@ $(word 2,$^)
endif

clean:
	rm -rf acceptance
.PHONY: clean
