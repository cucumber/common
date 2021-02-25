include default.mk

TYPESCRIPT_SOURCE_FILES = $(sort $(call rwildcard,src test,*.ts *.tsx))
NPM ?= npm

ENVIRONMENT_FILES = $(shell find ../testdata -name "*.txt")
CIS               = $(patsubst ../testdata/%.txt,acceptance/%.txt.json,$(ENVIRONMENT_FILES))

.DELETE_ON_ERROR:

.tested: .compared

.compared: .built $(CIS)
	touch $@

.built: .codegen $(TYPESCRIPT_SOURCE_FILES)
	$(NPM) run build
	touch $@

acceptance/%.txt.json: ../testdata/%.txt ../testdata/%.txt.json
	mkdir -p $(@D)
	./bin/print-meta $< | jq --sort-keys "." > $@
	diff --unified <(jq --sort-keys "." $<.json) <(jq "." $@)
