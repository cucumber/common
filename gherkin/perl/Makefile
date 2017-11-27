SHELL := /usr/bin/env bash
GOOD_FEATURE_FILES = $(shell find testdata/good -name "*.feature")
BAD_FEATURE_FILES  = $(shell find testdata/bad -name "*.feature")

TOKENS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.tokens,$(GOOD_FEATURE_FILES))
ASTS     = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.ast.ndjson,$(GOOD_FEATURE_FILES))
PICKLES  = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.pickles.ndjson,$(GOOD_FEATURE_FILES))
ERRORS   = $(patsubst testdata/%.feature,acceptance/testdata/%.feature.errors.ndjson,$(BAD_FEATURE_FILES))

PERL_FILES = $(shell find . -name "*.pm")

.DELETE_ON_ERROR:

default: .compared
.PHONY: all

#.compared: .built $(TOKENS) $(ASTS) $(PICKLES) $(ERRORS)
.compared: .built $(TOKENS) $(ASTS) $(PICKLES)
	touch $@

.cpanfile_dependencies:
	cpanm --installdeps .
	touch $@

.built: .cpanfile_dependencies lib/Gherkin/Generated/Parser.pm lib/Gherkin/Generated/Languages.pm $(PERL_FILES) bin/gherkin-generate-tokens bin/gherkin-generate-ast LICENSE.txt
	@$(MAKE) --no-print-directory show-version-info
	# add Perl-level unit tests
	touch $@

show-version-info:
	perl --version
.PHONY: show-version-info

acceptance/testdata/%.feature.tokens: testdata/%.feature testdata/%.feature.tokens .built
	mkdir -p `dirname $@`
	bin/gherkin-generate-tokens $< > $@
	diff --unified $<.tokens $@

acceptance/testdata/%.feature.ast.ndjson: testdata/%.feature testdata/%.feature.ast.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin-generate-ast $< > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin-generate-pickles $< > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .built
	mkdir -p `dirname $@`
	bin/gherkin-generate-ast $< > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

# Get to a point where dzil can be run
predistribution: .compared CHANGES
	cpanm --installdeps --with-develop .
	dzil clean
	@(git status --porcelain 2>/dev/null | grep "^??" | perl -ne\
	    'die "The `release` target includes all files in the working directory. Please remove [$$_], or add it to .gitignore if it should be included\n" if s!.+ perl/(.+?)\n!$$1!')

distribution: predistribution
	dzil test --release && dzil build

release: predistribution
	dzil release

clean:
	rm -rf Gherkin-* .compared .cpanfile_dependencies .built acceptance
.PHONY: clean

clobber: clean
	rm -rf lib/Gherkin/Generated/Languages.pm lib/Gherkin/Generated/Parser.pm
.PHONY: clobber

lib/Gherkin/Generated:
	mkdir -p $@

lib/Gherkin/Generated/Languages.pm: gherkin-languages.json
	perl helper-scripts/build_languages.pl < $< > $@

lib/Gherkin/Generated/Parser.pm: gherkin.berp gherkin-perl.razor berp/berp.exe
	mono berp/berp.exe -g gherkin.berp -t gherkin-perl.razor -o $@
	# Remove BOM
	tail -c +4 $@ > $@.nobom
	mv $@.nobom $@
