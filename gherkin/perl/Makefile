SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

PERL_FILES = $(shell find . -name "*.pm")

.DELETE_ON_ERROR:

default: test
.PHONY: all

test: .built $(TOKENS) $(ASTS) $(PICKLES)
	PERL5LIB=./perl5/lib/perl5 prove -l

.cpanfile_dependencies:
	cpanm --notest --local-lib ./perl5 --installdeps .
	touch $@

.built: .cpanfile_dependencies lib/Gherkin/Generated/Parser.pm lib/Gherkin/Generated/Languages.pm $(PERL_FILES) bin/gherkin-generate-tokens bin/gherkin-generate-ast LICENSE.txt
	@$(MAKE) --no-print-directory show-version-info
	# add Perl-level unit tests
	touch $@

show-version-info:
	perl --version
.PHONY: show-version-info

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens .built
	mkdir -p $(@D)
	PERL5LIB=./perl5/lib/perl5 bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .built
	mkdir -p $(@D)
	PERL5LIB=./perl5/lib/perl5 bin/gherkin-generate-ast $< > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .built
	mkdir -p $(@D)
	PERL5LIB=./perl5/lib/perl5 bin/gherkin-generate-pickles $< > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .built
	mkdir -p $(@D)
	PERL5LIB=./perl5/lib/perl5 bin/gherkin-generate-ast $< > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

CHANGES:
	cp ../CHANGELOG.md CHANGES

# Get to a point where dzil can be run
predistribution: test CHANGES
# --notest to keep the number of dependencies low
	cpanm --notest --installdeps --with-develop .
	dzil clean
	@(git status --porcelain 2>/dev/null | grep "^??" | perl -ne\
	    'die "The `release` target includes all files in the working directory. Please remove [$$_], or add it to .gitignore if it should be included\n" if s!.+ perl/(.+?)\n!$$1!')

distribution: predistribution
	dzil test --release && dzil build

release: predistribution
	dzil release

clean:
	rm -rf Gherkin-* .cpanfile_dependencies .built acceptance CHANGES
.PHONY: clean

clobber: clean
	rm -rf lib/Gherkin/Generated/Languages.pm lib/Gherkin/Generated/Parser.pm
.PHONY: clobber

lib/Gherkin/Generated:
	mkdir -p $@

lib/Gherkin/Generated/Languages.pm: gherkin-languages.json
	perl helper-scripts/build_languages.pl < $< > $@

lib/Gherkin/Generated/Parser.pm: gherkin.berp gherkin-perl.razor
	mono  /var/lib/berp/1.1.1/tools/net471/Berp.exe -g gherkin.berp -t gherkin-perl.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@
