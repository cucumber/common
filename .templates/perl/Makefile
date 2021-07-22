include default.mk

default: test
.PHONY: all test

TESTDEPS := t/*.t

test: $(TESTDEPS) .cpanfile_dependencies
	PERL5LIB=./perl5/lib/perl5 prove -l

