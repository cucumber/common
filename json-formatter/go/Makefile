include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

GOLDEN_JSONS = $(call rwildcard,../ruby/features,*.json)
GENERATED_JSONS = $(patsubst ../ruby/features/%.json,acceptance/%.json,$(GOLDEN_JSONS))

.DELETE_ON_ERROR:

.tested: $(GENERATED_JSONS)

acceptance/%.json: ../javascript/features/%.ndjson $(EXE) ../ruby/features/%.json
	mkdir -p $(@D)
	cat $< | \
		$(EXE) --format ndjson | \
		../ruby/neutralize-json | \
		jq --sort-keys "." > \
		$@
	diff --unified $(word 3, $^) $@
