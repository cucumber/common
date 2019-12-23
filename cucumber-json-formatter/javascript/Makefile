INTERNAL_DEPENDENCIES = cucumber-messages \
	fake-cucumber
include default.mk

FEATURE_FILES = $(sort $(wildcard ../ruby/features/*.feature))
FEATURE_NDJSONS = $(patsubst ../ruby/features/%.feature,acceptance/%.ndjson,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(FEATURE_NDJSONS) acceptance/all.ndjson

acceptance/all.ndjson: $(FEATURE_FILES) .deps
	mkdir -p $$(dirname $@)
	pushd ../ruby && \
		../javascript/node_modules/fake-cucumber/bin/fake-cucumber \
		--format ndjson \
		--predictable-ids \
		--require ../javascript/features \
		$(patsubst ../ruby/%,%,$^) > \
		../javascript/$@ && \
		popd

acceptance/test_%.ndjson: ../ruby/features/test_%.feature .deps
	mkdir -p $$(dirname $@)
	pushd ../ruby && \
		../javascript/node_modules/fake-cucumber/bin/fake-cucumber \
		--format ndjson \
		--predictable-ids \
		--require ../javascript/features \
		$(patsubst ../ruby/%,%,$^) > \
		../javascript/$@ && \
		popd
