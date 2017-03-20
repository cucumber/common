MAKEFILES=$(wildcard */Makefile)
EVENT_FILES = $(wildcard testdata/**/*.ndjson)
SCHEMAS = $(wildcard ../event-protocol/schemas/*.json)

all: validate-events install
.PHONY: all

install: $(patsubst %/Makefile,install-%,$(MAKEFILES))
.PHONY: install

install-%: %
	cd $< && make install

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean

clean-%: %
	cd $< && make clean

validate-events: .valid-events
.PHONY: validate-events

.valid-events: $(EVENT_FILES) $(SCHEMAS)
	@cat $(EVENT_FILES) | node ../event-protocol/bin/cucumber-event-validator.js
	touch $@
