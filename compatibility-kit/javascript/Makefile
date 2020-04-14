include default.mk

FEATURE_FILES = $(sort $(wildcard features/**/*.feature))
NDJSON_FILES = $(patsubst features/%.feature,features/%.ndjson,$(FEATURE_FILES))
BINARY_FILES = $(patsubst features/%.feature,features/%.bin,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: ndjson_files

ndjson_files: $(NDJSON_FILES)
.PHONY: ndjson_files

features/%.ndjson: features/%.feature features/%.ts .deps
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
		--format ndjson \
		--predictable-ids \
		$< > $@

binary_files: $(BINARY_FILES)
.PHONY: ndjson_files

features/%.bin: features/%.feature features/%.ts .deps
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
		--format protobuf \
		--predictable-ids \
		$< > $@

clean: clean-ndjson

clean-ndjson:
	rm -f $(NDJSON_FILES)
.PHONY: clean-ndjson