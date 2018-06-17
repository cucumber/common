MAKEFILES=dotnet/Makefile go/Makefile java/Makefile javascript/Makefile ruby/Makefile
# Temporarily disable build of c,objective-c,perl,python until they
# implement https://github.com/cucumber/cucumber/pull/353
# MAKEFILES=$(wildcard */Makefile)
EVENT_FILES = $(wildcard testdata/**/*.ndjson)
SCHEMAS = $(wildcard ../event-protocol/schemas/*.json)

default: $(patsubst %/Makefile,default-%,$(MAKEFILES))
.PHONY: default

default-%: %
	cd $< && make default

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean

validate-events: .valid-events
.PHONY: validate-events

.valid-events: $(EVENT_FILES) $(SCHEMAS)
	@cat $(EVENT_FILES) | node ../event-protocol/bin/cucumber-event-validator.js
	touch $@
