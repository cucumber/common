include default.mk

FEATURE_FILES = $(sort $(wildcard features/**/*.feature))
NDJSON_FILES = $(patsubst features/%.feature,features/%.ndjson,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: $(NDJSON_FILES)

features/%.ndjson: features/%.feature features/%.ts .deps
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
		--format ndjson \
		--predictable-ids \
		$< > $@

clean: clean-ndjson

clean-ndjson:
	rm -f $(NDJSON_FILES)
.PHONY: clean-ndjson