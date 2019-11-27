include default.mk

FEATURE_FILES = $(shell find features -name "*.feature")
MESSAGES = $(patsubst features/%.feature,features/%.ndjson,$(FEATURE_FILES))

.tested: $(MESSAGES)

features/%.ndjson: features/%.feature
	mkdir -p `dirname $@`
	./bin/fake-cucumber --format ndjson $< > $@
