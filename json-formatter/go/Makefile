include default.mk

FEATURE_FILES = $(wildcard ../testdata/features/*.feature)
JSONS         = $(patsubst ../testdata/features/%.feature,acceptance/%.json,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(JSONS)

acceptance/%.bin: ../testdata/features/%.feature $(EXE)
	mkdir -p $$(dirname $@)
	cd ../testdata && \
		../../fake-cucumber/javascript/bin/fake-cucumber \
		--results pattern \
		$(patsubst ../testdata/%,%,$<) > \
		../go/$@

acceptance/%.json: acceptance/%.bin ../testdata/features/%.json
	cat $< | \
		../go/$(EXE) | \
		jq --sort-keys "." > \
		$@

	diff --unified $(word 2, $^) $@
