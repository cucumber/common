# Please update /.templates/perl/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
SHELL := /usr/bin/env bash
PERL_SOURCE_FILES = $(shell find lib -name '*.pm') $(shell test -d bin && find bin -type f) $(shell find t -name '*.t')
LIBNAME := $(shell head -10 dist.ini | grep 'name.*=' | sed -e 's/name.*= *//')
DISTINI  = $(shell find . -name 'dist.ini')
DIST := $(LIBNAME)-$(NEW_VERSION).tar.gz
IS_TESTDATA = $(findstring -testdata,${CURDIR})

### COMMON stuff for all platforms

BERP_VERSION = 1.3.0
BERP_GRAMMAR = gherkin.berp

define berp-generate-parser =
-! dotnet tool list --tool-path /usr/bin | grep "berp\s*$(BERP_VERSION)" && dotnet tool update Berp --version $(BERP_VERSION) --tool-path /usr/bin
berp -g $(BERP_GRAMMAR) -t $< -o $@ --noBOM
endef


### Common targets for all functionalities implemented on Perl

default: .tested
.PHONY: default

.deps: .cpanfile_dependencies
	touch $@

.cpanfile_dependencies: cpanfile dist.ini
	# --notest to keep the number of dependencies low: it doesn't install the
	# testing dependencies of the dependencies.
	cpanm --notest --local-lib ./perl5 --installdeps --with-develop .
	cpanm --notest --local-lib ./perl5 'Dist::Zilla'
	PERL5LIB=${PERL5LIB} PATH=$$PATH:${PERL5PATH} dzil authordeps --missing | cpanm --notest --local-lib ./perl5
	touch $@

.tested: .deps $(PERL_SOURCE_FILES)
	PERL5LIB=${PERL5LIB} prove -l
	touch $@

ifdef NEW_VERSION
ifneq (,$(DISTINI))
dist: $(DIST)
else
dist:
	@echo "Not building dist because there is no dist.ini"
endif
endif
.PHONY: dist

$(DIST): .tested
	@(git status --porcelain 2>/dev/null | grep "^??" | perl -ne\
	    'die "The `release` target includes all files in the working directory. Please remove [$$_], or add it to .gitignore if it should be included\n" if s!.+ perl/(.+?)\n!$$1!')
	PERL5LIB=${PERL5LIB} PATH=$$PATH:${PERL5PATH} dzil build
	PERL5LIB=${PERL5LIB} PATH=$$PATH:${PERL5PATH} cpanm --local-lib $(shell mktemp -d) --test-only $(DIST)

pre-release: update-version CHANGELOG.md dist
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
	echo $(NEW_VERSION) > VERSION
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version


publish: dist
ifeq ($(IS_TESTDATA),-testdata)
	# no-op
else
ifneq (,$(DISTINI))
	cpan-upload $(DIST)
endif
endif
.PHONY: publish

post-release:
.PHONY: post-release

perl-clean:
	PERL5LIB=${PERL5LIB} PATH=$$PATH:${PERL5PATH} dzil clean
	rm -rf ./perl5 .deps .cpanfile_dependencies .tested
.PHONY: perl-clean

clean: perl-clean
.PHONY: clean

CHANGELOG.md: ../CHANGELOG.md
	cp ../CHANGELOG.md CHANGELOG.md


dist-clean: clean
.PHONY: dist-clean
