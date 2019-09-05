include default.mk

FEATURE_FILES = $(wildcard ../testdata/features/*.feature)
JSONS  = $(patsubst ../testdata/features/%.feature,acceptance/%.json,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(JSONS)

acceptance/%.json: ../testdata/features/%.feature ../testdata/features/%.json $(EXE)
	mkdir -p $$(dirname $@)
	cd ../testdata && \
	../../fake-cucumber/javascript/bin/fake-cucumber \
		--results pattern \
		$(patsubst ../testdata/%,%,$<) | \
		../go/$(EXE) | \
		jq --sort-keys "." > \
		../go/$@

	diff --unified $(word 2, $^) $@
