include default.mk

FEATURE_FILES = $(sort $(wildcard ../ruby/features/*.feature))
FEATURE_BINS = $(patsubst ../ruby/features/%.feature,acceptance/%.bin,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(FEATURE_BINS) acceptance/all.bin

acceptance/all.bin: $(FEATURE_FILES)
	mkdir -p $$(dirname $@)
	pushd ../ruby && \
		../javascript/node_modules/fake-cucumber/bin/fake-cucumber \
		--results pattern \
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
