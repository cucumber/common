include default.mk

FEATURE_FILES = $(wildcard ../testdata/features/*.feature)
JSONS         = $(patsubst ../testdata/features/%.feature,acceptance/%.json,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(JSONS)

acceptance/%.bin: ../testdata/features/%.feature
	mkdir -p $$(dirname $@)
	pushd ../testdata && \
		../../fake-cucumber/javascript/bin/fake-cucumber \
		--results pattern \
		$(patsubst ../testdata/%,%,$<) > \
		../go/$@ && \
		popd

acceptance/%.json: acceptance/%.bin $(EXE) ../testdata/features/%.json
	cat $< | \
		$(EXE) | \
		jq --sort-keys "." > \
		$@
	diff --unified $(word 3, $^) $@

#../testdata/features/%.json:
#	pushd ../testdata && make && popd
