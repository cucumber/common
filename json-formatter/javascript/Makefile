include default.mk

FEATURE_FILES = $(sort $(wildcard ../ruby/features/*.feature))
FEATURE_BINS = $(patsubst ../ruby/features/%.feature,acceptance/%.bin,$(FEATURE_FILES))
FEATURE_JSONS = $(patsubst ../ruby/features/%.feature,acceptance/%.json,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(FEATURE_BINS) acceptance/all.bin $(FEATURE_JSONS) acceptance/all.json

acceptance/all.bin: $(FEATURE_FILES)
	mkdir -p $$(dirname $@)
	pushd ../ruby && \
		../javascript/node_modules/fake-cucumber/bin/fake-cucumber \
		--results pattern \
		$(patsubst ../ruby/%,%,$^) > \
		../javascript/$@ && \
		popd

acceptance/all.json: $(FEATURE_FILES)
	mkdir -p $$(dirname $@)
	pushd ../ruby && \
		../javascript/node_modules/fake-cucumber/bin/fake-cucumber \
		--results pattern \
		--format ndjson \
		$(patsubst ../ruby/%,%,$^) > \
		../javascript/$@ && \
		popd

acceptance/test_%.bin: ../ruby/features/test_%.feature
	mkdir -p $$(dirname $@)
	pushd ../ruby && \
		../javascript/node_modules/fake-cucumber/bin/fake-cucumber \
		--results pattern \
		$(patsubst ../ruby/%,%,$^) > \
		../javascript/$@ && \
		popd

acceptance/test_%.json: ../ruby/features/test_%.feature
	mkdir -p $$(dirname $@)
	pushd ../ruby && \
		../javascript/node_modules/fake-cucumber/bin/fake-cucumber \
		--results pattern \
		--format ndjson \
		$(patsubst ../ruby/%,%,$^) > \
		../javascript/$@ && \
		popd
