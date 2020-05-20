include default.mk

FEATURE_FILES = $(sort $(wildcard features/**/*.feature))
NDJSON_FILES = $(patsubst features/%.feature,features/%.ndjson,$(FEATURE_FILES))
BINARY_FILES = $(patsubst features/%.feature,features/%.bin,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: ndjson_files

ndjson_files: $(NDJSON_FILES)
.PHONY: ndjson_files

features/%.ndjson: features/%.feature features/%.ts .deps
ifdef GOLDEN
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
		--format ndjson \
		--predictable-ids \
		$< > $@
else
  # no-op: run with GOLDEN=1
endif

binary_files: $(BINARY_FILES)
.PHONY: ndjson_files

features/%.bin: features/%.feature features/%.ts .deps
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
		--format protobuf \
		--predictable-ids \
		$< > $@

clean: clean-ndjson

clean-ndjson:
ifdef GOLDEN
	rm -f $(NDJSON_FILES)
endif
.PHONY: clean-ndjson