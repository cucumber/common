# Please update /.templates/perl/default.mk and sync:
#
#     source scripts/functions.sh && rsync_files
#
SHELL := /usr/bin/env bash
ALPINE := $(shell which apk 2> /dev/null)

### COMMON stuff for all platforms

BERP_VERSION = 1.3.0
BERP_GRAMMAR = gherkin.berp

define berp-generate-parser =
-! dotnet tool list --tool-path /usr/bin | grep "berp\s*$(BERP_VERSION)" && dotnet tool update Berp --version $(BERP_VERSION) --tool-path /usr/bin
berp -g $(BERP_GRAMMAR) -t $< -o $@ --noBOM
endef


### Common targets for all functionalities implemented on Perl

default: test
.PHONY: default

CHANGELOG.md: ../CHANGELOG.md
	cp ../CHANGELOG.md CHANGELOG.md

distribution: predistribution
	PERL5LIB=${PERL5LIB} PATH=$$PATH:${PERL5PATH} dzil test --release
	PERL5LIB=${PERL5LIB} PATH=$$PATH:${PERL5PATH} dzil build
.PHONY: distribution

publish: predistribution
	PERL5LIB=${PERL5LIB} PATH=$$PATH:${PERL5PATH} dzil release
.PHONY: publish

update-version:
ifdef NEW_VERSION
	echo $(NEW_VERSION) > VERSION
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

.cpanfile_dependencies: cpanfile
	PERL5LIB=${PERL5LIB} cpanm --notest --local-lib ./perl5 --installdeps .
	touch $@

predistribution: dist-clean test CHANGELOG.md
# --notest to keep the number of dependencies low: it doesn't install the
# testing dependencies of the dependencies.
	cpanm --notest --local-lib ./perl5 --installdeps --with-develop .
	cpanm --notest --local-lib ./perl5 'Dist::Zilla'
	PERL5LIB=${PERL5LIB} PATH=$$PATH:${PERL5PATH} dzil authordeps --missing | cpanm --notest --local-lib ./perl5
	PERL5LIB=${PERL5LIB} PATH=$$PATH:${PERL5PATH} dzil clean
	@(git status --porcelain 2>/dev/null | grep "^??" | perl -ne\
	    'die "The `release` target includes all files in the working directory. Please remove [$$_], or add it to .gitignore if it should be included\n" if s!.+ perl/(.+?)\n!$$1!')
.PHONY: predistribution

pre-release: update-version
.PHONY: pre-release

post-release:
.PHONY: post-release

dist-clean: clean
	rm -rf ./perl5

.PHONY: dist-clean
