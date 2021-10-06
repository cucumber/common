include default.mk

PERL5LIB  = $$PWD/perl5/lib/perl5
PERL5PATH = $$PWD/perl5/bin



test: .cpanfile_dependencies
	PERL5LIB=${PERL5LIB} AUTHOR_TESTS=1 prove -l
.PHONY: test clean clobber

clean:
	rm -rf Cucumber-* .cpanfile_dependencies .built CHANGELOG.md

clobber: clean
# empty target
