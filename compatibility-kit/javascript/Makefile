include default.mk

FEATURE_FILES = $(sort $(wildcard features/**/*.feature features/**/*.md))
NDJSON_FILES = $(patsubst features/%,features/%.ndjson,$(FEATURE_FILES))
VALIDATED_NDJSON_FILES = $(patsubst features/%.ndjson,acceptance/%.ndjson,$(NDJSON_FILES))

.DELETE_ON_ERROR:

.tested: $(NDJSON_FILES)
# TODO: Uncomment next line and remove previous line
#.tested: $(NDJSON_FILES) $(VALIDATED_NDJSON_FILES)

features/%.ndjson: features/% features/%.ts
ifdef GOLDEN
	source ../ci_env
	../../node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
	$< > $@
else
  # no-op: run with GOLDEN=1
endif

acceptance/%.ndjson: features/%.ndjson
	mkdir -p $(@D)
	cat $< | ../../node_modules/.bin/ts-node src/validate.ts > $@

clean:
ifdef GOLDEN
	rm -f $(NDJSON_FILES)
endif
.PHONY: clean
