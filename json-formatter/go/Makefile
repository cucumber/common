include default.mk

GOLDEN_JSONS = $(call rwildcard,../ruby-testdata/features,*.json)
GENERATED_JSONS = $(patsubst ../ruby-testdata/features/%.json,acceptance/%.json,$(GOLDEN_JSONS))

.DELETE_ON_ERROR:

.tested: $(GENERATED_JSONS)

acceptance/%.json: ../javascript-testdata/features/%.ndjson $(EXE) ../ruby-testdata/features/%.json
	mkdir -p $(@D)
	cat $< | \
		$(EXE) | \
		../ruby-testdata/neutralize-json | \
		jq --sort-keys "." > \
		$@
	diff --unified $(word 3, $^) $@
