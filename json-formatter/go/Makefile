include default.mk

FEATURE_FILES = $(wildcard ../testdata/features/*.feature)
JSONS  = $(patsubst ../testdata/features/%.feature,acceptance/%.json,$(FEATURE_FILES))

.DELETE_ON_ERROR:

default: $(JSONS)

acceptance/%.json: ../testdata/features/%.feature ../testdata/features/%.json
	mkdir -p $$(dirname $@)
	../../fake-cucumber/javascript/bin/fake-cucumber \
		--results pattern \
		$< | \
		$(EXE) > \
		$@

	#diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)