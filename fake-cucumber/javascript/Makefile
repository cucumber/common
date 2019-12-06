include default.mk

FEATURE_FILES = $(shell find features -name "*.feature")
MESSAGES = $(patsubst features/%.feature,features/%.ndjson,$(FEATURE_FILES))
GOLDEN_MESSAGES = $(patsubst features/%.feature,features/%.golden.ndjson,$(FEATURE_FILES))

.tested: $(MESSAGES)

golden: $(GOLDEN_MESSAGES)

features/%.ndjson: features/%.feature .built
	mkdir -p `dirname $@`
	./bin/fake-cucumber --format ndjson $< > $@

features/%.golden.ndjson: features/%.feature .built
	mkdir -p `dirname $@`
	./bin/fake-cucumber --format ndjson $< > $@
