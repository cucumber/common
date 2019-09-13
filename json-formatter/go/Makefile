include default.mk

FEATURE_FILES = $(wildcard ../testdata/features/*.feature)
FEATURE_JSONS = $(patsubst ../testdata/features/%.feature,acceptance/%.json,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(FEATURE_JSONS) acceptance/all.json

acceptance/all.bin: $(FEATURE_FILES)
	mkdir -p $$(dirname $@)
	pushd ../testdata && \
		../../fake-cucumber/javascript/bin/fake-cucumber \
		--results pattern \
		$(patsubst ../testdata/%,%,$^) > \
		../go/$@ && \
		popd

acceptance/test_%.bin: ../testdata/features/test_%.feature
	mkdir -p $$(dirname $@)
	pushd ../testdata && \
		../../fake-cucumber/javascript/bin/fake-cucumber \
		--results pattern \
		$(patsubst ../testdata/%,%,$^) > \
		../go/$@ && \
		popd

acceptance/%.json: acceptance/%.bin $(EXE) ../testdata/features/%.json
	cat $< | \
		$(EXE) | \
		../testdata/neutralize-json | \
		jq --sort-keys "." > \
		$@
	diff --unified $(word 3, $^) $@

#../testdata/features/%.json:
#	pushd ../testdata && make && popd
