include default.mk

CCK_FEATURE_FILES = $(wildcard ../javascript/features/**/*.feature)
CCK_MARKDOWN_FILES = $(wildcard ../javascript/features/**/*.feature.md)
CCK_NDJSON_FILES = $(wildcard ../javascript/features/**/*.ndjson)

FEATURE_FILES = $(patsubst ../javascript/%, %, $(CCK_FEATURE_FILES))
MARKDOWN_FILES = $(patsubst ../javascript/%, %, $(CCK_MARKDOWN_FILES))
NDJSON_FILES = $(patsubst ../javascript/%, %, $(CCK_NDJSON_FILES))

.deps: $(FEATURE_FILES) $(MARKDOWN_FILES) $(NDJSON_FILES)

features/%.feature: ../javascript/features/%.feature
	cp $(patsubst %,../javascript/%,$@) $@

features/%.feature.md: ../javascript/features/%.feature.md
	cp $(patsubst %,../javascript/%,$@) $@

features/%.ndjson: ../javascript/features/%.ndjson
	cp $(patsubst %,../javascript/%,$@) $@

clean:
	rm -f features/**/*.feature
	rm -f features/**/*.feature.md
	rm -f features/**/*.ndjson
