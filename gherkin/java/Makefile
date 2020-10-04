include default.mk

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature" -o -name "*.md")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature" -o -name "*.md")

TOKENS       = $(patsubst testdata/%,acceptance/testdata/%.tokens,$(GOOD_FEATURE_FILES))
ASTS         = $(patsubst testdata/%,acceptance/testdata/%.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES      = $(patsubst testdata/%,acceptance/testdata/%.pickles.ndjson,$(GOOD_FEATURE_FILES))
SOURCES      = $(patsubst testdata/%,acceptance/testdata/%.source.ndjson,$(GOOD_FEATURE_FILES))
ERRORS       = $(patsubst testdata/%,acceptance/testdata/%.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

default: .compared

.deps: src/main/java/io/cucumber/gherkin/Parser.java

src/main/java/io/cucumber/gherkin/Parser.java: gherkin.berp gherkin-java.razor
	mono  /var/lib/berp/1.1.1/tools/net471/Berp.exe -g gherkin.berp -t gherkin-java.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@

.compared: $(TOKENS) $(ASTS) $(PICKLES) $(ERRORS) $(SOURCES)
	touch $@

acceptance/testdata/%.tokens: testdata/% testdata/%.tokens .built
	mkdir -p $(@D)
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.ast.ndjson: testdata/% testdata/%.ast.ndjson .built
	mkdir -p $(@D)
	bin/gherkin --no-source --no-pickles --format ndjson --predictable-ids $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.pickles.ndjson: testdata/% testdata/%.pickles.ndjson .built
	mkdir -p $(@D)
	bin/gherkin --no-source --no-ast --format ndjson --predictable-ids $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.source.ndjson: testdata/% testdata/%.source.ndjson .built
	mkdir -p $(@D)
	bin/gherkin --no-ast --no-pickles --format ndjson --predictable-ids $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.source.ndjson) <(jq "." $@)

acceptance/testdata/%.errors.ndjson: testdata/% testdata/%.errors.ndjson .built
	mkdir -p $(@D)
	bin/gherkin --no-source --format ndjson --predictable-ids $< | jq --sort-keys --compact-output "." > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

clean:
	rm -rf .compared acceptance bin/classpath.txt

clobber: clean
	rm -f src/main/java/io/cucumber/gherkin/Parser.java
