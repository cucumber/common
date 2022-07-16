include default.mk

ifeq ($(CI),)
PERL5LIB  = $$PWD/perl5/lib/perl5
else
PERL5LIB  = $$PWD/../../messages/perl/lib:$$PWD/perl5/lib/perl5
endif
PERL5PATH = $$PWD/perl5/bin

GOOD_FEATURE_FILES = $(shell find ../testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find ../testdata/bad -name "*.feature")

TOKENS   = $(patsubst ../testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst ../testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst ../testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst ../testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

default: .compared

.deps: lib/Gherkin/Generated/Parser.pm lib/Gherkin/Generated/Languages.pm

.compared: $(TOKENS) $(ASTS) $(PICKLES) # $(ERRORS)
	touch $@

acceptance/testdata/%.feature.tokens: ../testdata/%.feature ../testdata/%.feature.tokens .deps
	mkdir -p $(@D)
	PERL5LIB=${PERL5LIB} bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: ../testdata/%.feature ../testdata/%.feature.ast.ndjson .deps
	mkdir -p $(@D)
	PERL5LIB=${PERL5LIB} bin/gherkin --predictable-ids --no-source --no-pickles $< > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: ../testdata/%.feature ../testdata/%.feature.pickles.ndjson .deps
	mkdir -p $(@D)
	PERL5LIB=${PERL5LIB} bin/gherkin --predictable-ids --no-source --no-ast $< > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

#acceptance/testdata/%.feature.errors.ndjson: ../testdata/%.feature ../testdata/%.feature.errors.ndjson .deps
#	mkdir -p $(@D)
#	PERL5LIB=${PERL5LIB} bin/gherkin --predictable-ids --no-pickles $< | jq --sort-keys --compact-output "." > $@
#	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

clean:
	rm -rf .compared acceptance
.PHONY: clean

clobber: clean
	rm -rf lib/Gherkin/Generated
.PHONY: clobber

lib/Gherkin/Generated:
	mkdir -p $@

lib/Gherkin/Generated/Languages.pm: gherkin-languages.json .cpanfile_dependencies
	PERL5LIB=./perl5/lib/perl5 perl helper-scripts/build_languages.pl < $< > $@

lib/Gherkin/Generated/Parser.pm: gherkin-perl.razor gherkin.berp
	$(berp-generate-parser)
