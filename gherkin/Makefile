
MAKEFILES=$(wildcard */Makefile)
EVENT_FILES = $(wildcard testdata/**/*.ndjson)

all: $(patsubst %/Makefile,%/.compared,$(MAKEFILES))
.PHONY: all

.valid-events: $(EVENT_FILES)
	@cat $(EVENT_FILES) | node ../event-protocol/bin/cucumber-event-validator.js

%/.compared: % gherkin-languages.json gherkin.berp
	cd $< && make

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean
clean-%: %
	cd $< && make clean
