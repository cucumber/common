include default.mk

ifeq ($(CI),)
PERL5LIB  = $$PWD/perl5/lib/perl5
else
PERL5LIB  = $$PWD/../../messages/perl/lib:$$PWD/perl5/lib/perl5
endif
PERL5PATH = $$PWD/perl5/bin

GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

.DELETE_ON_ERROR:

test: .built $(TOKENS) $(ASTS) $(PICKLES)
	PERL5LIB=${PERL5LIB} prove -l

.built: .cpanfile_dependencies lib/Gherkin/Generated/Parser.pm lib/Gherkin/Generated/Languages.pm bin/gherkin-generate-tokens LICENSE.txt
	@$(MAKE) --no-print-directory show-version-info
	# add Perl-level unit tests
	touch $@

show-version-info:
	perl --version
.PHONY: show-version-info

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens .built
	mkdir -p $(@D)
	PERL5LIB=${PERL5LIB} bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .built
	mkdir -p $(@D)
	PERL5LIB=${PERL5LIB} bin/gherkin --predictable-ids --no-source --no-pickles $< > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .built
	mkdir -p $(@D)
	PERL5LIB=${PERL5LIB} bin/gherkin --predictable-ids --no-source --no-ast $< > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .built
	mkdir -p $(@D)
	PERL5LIB=${PERL5LIB} bin/gherkin --predictable-ids --no-source --no-pickles $< > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

post-release:
.PHONY: post-release

update-dependencies:
	@echo -e "\033[0;31mPlease update dependencies for perl manually!!\033[0m"
.PHONY: update-dependencies

clean:
	rm -rf Gherkin-* .cpanfile_dependencies .built acceptance CHANGELOG.md
.PHONY: clean

clobber: clean
	rm -rf lib/Gherkin/Generated/Languages.pm lib/Gherkin/Generated/Parser.pm
.PHONY: clobber

lib/Gherkin/Generated:
	mkdir -p $@

lib/Gherkin/Generated/Languages.pm: gherkin-languages.json .cpanfile_dependencies
	PERL5LIB=./perl5/lib/perl5 perl helper-scripts/build_languages.pl < $< > $@

lib/Gherkin/Generated/Parser.pm: gherkin-perl.razor gherkin.berp
	$(berp-generate-parser)

pre-release: update-version
.PHONY: pre-release
