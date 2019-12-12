include default.mk

FEATURE_FILES = $(sort $(wildcard features/**/*.feature))
FEATURE_NDJSONS = $(patsubst features/%.feature,features/%.ndjson,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(FEATURE_NDJSONS)

features/%.ndjson: features/%.feature .deps
	./node_modules/fake-cucumber/bin/fake-cucumber \
		--format ndjson \
		--predictable-ids \
		$< > $@