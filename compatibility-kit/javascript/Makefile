include default.mk

FEATURE_FILES = $(sort $(wildcard features/**/*.feature features/**/*.md))
NDJSON_FILES = $(patsubst features/%,features/%.ndjson,$(FEATURE_FILES))

.DELETE_ON_ERROR:

.tested: ndjson_files

ndjson_files: $(NDJSON_FILES)
.PHONY: ndjson_files

features/%.ndjson: features/% features/%.ts
ifdef GOLDEN
	source ../ci_env
	../../node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
		$< > $@
else
  # no-op: run with GOLDEN=1
endif

clean:
ifdef GOLDEN
	rm -f $(NDJSON_FILES)
endif
.PHONY: clean
