include default.mk

GOLDEN_JSONS = $(wildcard ../ruby/features/*.json)
GENERATED_JSONS = $(patsubst ../ruby/features/%.json,acceptance/%.json,$(GOLDEN_JSONS))

.DELETE_ON_ERROR:

.tested: $(GENERATED_JSONS)

acceptance/%.json: ../javascript/acceptance/%.bin $(EXE) ../ruby/features/%.json
	mkdir -p $$(dirname $@)
	cat $< | \
		$(EXE) | \
		../ruby/neutralize-json | \
		jq --sort-keys "." > \
		$@
	diff --unified $(word 3, $^) $@
