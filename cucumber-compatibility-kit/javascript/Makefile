include default.mk

FEATURE_FILES = $(sort $(wildcard features/**/*.feature))
NDJSON_FILES = $(patsubst features/%.feature,features/%.ndjson,$(FEATURE_FILES))
SUPPORT_FILES = $(patsubst features/%.feature,features/%.ts,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(NDJSON_FILES)

features/%.ndjson: features/%.feature features/%.ts .deps
	./node_modules/fake-cucumber/bin/fake-cucumber \
		--format ndjson \
		--predictable-ids \
		$< > $@