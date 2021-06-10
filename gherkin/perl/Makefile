include default.mk

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

.cpanfile_dependencies: cpanfile dist.ini
	cpanm --notest --local-lib ./perl5 --installdeps .
	touch $@

.built: .cpanfile_dependencies lib/Gherkin/Generated/Parser.pm lib/Gherkin/Generated/Languages.pm $(PERL_FILES) bin/gherkin-generate-tokens LICENSE.txt
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
	PERL5LIB=./perl5/lib/perl5 bin/gherkin --predictable-ids --no-source --no-pickles $< > $@
	diff --unified <(jq "." $<.ast.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.pickles.ndjson: testdata/%.feature testdata/%.feature.pickles.ndjson .built
	mkdir -p $(@D)
	PERL5LIB=./perl5/lib/perl5 bin/gherkin --predictable-ids --no-source --no-ast $< > $@
	diff --unified <(jq "." $<.pickles.ndjson) <(jq "." $@)

acceptance/testdata/%.feature.errors.ndjson: testdata/%.feature testdata/%.feature.errors.ndjson .built
	mkdir -p $(@D)
	PERL5LIB=./perl5/lib/perl5 bin/gherkin --predictable-ids --no-source --no-pickles $< > $@
	diff --unified <(jq "." $<.errors.ndjson) <(jq "." $@)

CHANGELOG.md: ../CHANGELOG.md
	cp ../CHANGELOG.md CHANGELOG.md

# Make sure dzil can be run ('dzil authordeps' installs dist.ini deps)
predistribution: test CHANGELOG.md
# --notest to keep the number of dependencies low: it doesn't install the
# testing dependencies of the dependencies.
	cpanm --notest --local-lib ./perl5 --installdeps --with-develop .
	cpanm --notest --local-lib ./perl5 'Dist::Zilla'
	PERL5LIB=./perl5/lib/perl5 PATH=$$PATH:./perl5/bin dzil authordeps --missing | cpanm --notest --local-lib ./perl5
	PERL5LIB=./perl5/lib/perl5 PATH=$$PATH:./perl5/bin dzil clean
	@(git status --porcelain 2>/dev/null | grep "^??" | perl -ne\
	    'die "The `release` target includes all files in the working directory. Please remove [$$_], or add it to .gitignore if it should be included\n" if s!.+ perl/(.+?)\n!$$1!')

distribution: predistribution
	PERL5LIB=$$PWD/perl5/lib/perl5 PATH=$$PATH:$$PWD/perl5/bin dzil test --release
	PERL5LIB=$$PWD/perl5/lib/perl5 PATH=$$PATH:$$PWD/perl5/bin dzil build

publish: predistribution
	PERL5LIB=$$PWD/perl5/lib/perl5 PATH=$$PATH:$$PWD/perl5/bin dzil release

post-release:
.PHONY: post-release

update-version:
ifdef NEW_VERSION
	echo $(NEW_VERSION) > VERSION
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

update-dependencies:
	@echo -e "\033[0;31mPlease update dependencies for perl manually!!\033[0m"
.PHONY: update-dependencies

clean:
	rm -rf Gherkin-* .cpanfile_dependencies .built acceptance CHANGES
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
