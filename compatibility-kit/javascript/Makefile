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
	GITHUB_SERVER_URL=https://github.com \
	GITHUB_REPOSITORY=cucumber-ltd/shouty.rb \
	GITHUB_RUN_ID=154666429 \
	GITHUB_SHA=99684bcacf01d95875834d87903dcb072306c9ad \
	GITHUB_REF=refs/heads/master \
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
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
