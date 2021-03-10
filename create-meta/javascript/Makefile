include default.mk

ENVIRONMENT_FILES = $(shell find ../testdata -name "*.txt")
CIS               = $(patsubst ../testdata/%.txt,acceptance/%.txt.json,$(ENVIRONMENT_FILES))
PRINT_META 		    = npm run print-meta --silent

.DELETE_ON_ERROR:

.tested: .compared

.compared: $(CIS)
	touch $@

acceptance/%.txt.json: ../testdata/%.txt ../testdata/%.txt.json
	mkdir -p $(@D)
	$(PRINT_META) -- $< | jq --sort-keys "." > $@
	diff --unified <(jq --sort-keys "." $<.json) <(jq "." $@)
