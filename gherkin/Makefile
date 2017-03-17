
MAKEFILES=$(wildcard */Makefile)
EVENT_FILES = $(wildcard testdata/**/*.ndjson)
SCHEMAS = $(wildcard ../event-protocol/schemas/*.json)

all: validate-events $(patsubst %/Makefile,%/.compared,$(MAKEFILES))
.PHONY: all

validate-events: .valid-events

.valid-events: $(EVENT_FILES) $(SCHEMAS)
	@cat $(EVENT_FILES) | node ../event-protocol/bin/cucumber-event-validator.js
	touch $@
.PHONY: validate-events

%/.compared: % gherkin-languages.json gherkin.berp
	cd $< && make

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean
clean-%: %
	cd $< && make clean
