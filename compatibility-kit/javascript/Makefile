include default.mk

FEATURE_FILES = $(sort $(wildcard features/**/*.feature))
NDJSON_FILES = $(patsubst features/%.feature,features/%.ndjson,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: ndjson_files

ndjson_files: $(NDJSON_FILES)
.PHONY: ndjson_files

features/%.ndjson: features/%.feature features/%.ts
ifdef GOLDEN
	source ../ci_env
	../../node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
		--format ndjson \
		$< > $@
else
  # no-op: run with GOLDEN=1
endif

clean:
ifdef GOLDEN
	rm -f $(NDJSON_FILES)
endif
.PHONY: clean
