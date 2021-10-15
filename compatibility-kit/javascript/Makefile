include default.mk

FEATURE_FILES = $(sort $(wildcard features/**/*.feature features/**/*.md))
NDJSON_FILES = $(patsubst features/%,features/%.ndjson,$(FEATURE_FILES))
VALIDATION_FILES = $(patsubst features/%.ndjson,acceptance/%.ndjson.valid,$(NDJSON_FILES))

.DELETE_ON_ERROR:

.tested: $(NDJSON_FILES) $(VALIDATION_FILES)

features/%.ndjson: features/% features/%.ts
ifdef GOLDEN
	source ../ci_env
	../../node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
	$< $(shell [ -f $(subst .feature,.arguments.txt,$<) ] && cat $(subst .feature,.arguments.txt,$<)) \
	--predictable-ids \
	| jq -cS > $@
else
  # no-op: run with GOLDEN=1
endif

acceptance/%.ndjson.valid: features/%.ndjson
	mkdir -p $(@D)
	cat $< | ../../node_modules/.bin/ts-node src/validate.ts > $@

clean:
ifdef GOLDEN
	rm -f $(NDJSON_FILES)
endif
.PHONY: clean
