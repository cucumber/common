include default.mk

PERL5LIB  = $$PWD/perl5/lib/perl5
PERL5PATH = $$PWD/perl5/bin



JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

test: lib/Cucumber/Messages.pm .cpanfile_dependencies
	PERL5LIB=${PERL5LIB} AUTHOR_TESTS=1 prove -l
.PHONY: test

lib/Cucumber/Messages.pm: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/perl.pm.erb ../jsonschema/scripts/templates/perl.enum.pm.erb
	ruby ../jsonschema/scripts/codegen.rb Perl ../jsonschema > $@

clean:
	rm -f lib/Cucumber/Messages.pm .cpanfile_dependencies .built

