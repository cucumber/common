include default.mk

FEATURE_FILES = $(shell find features -name "*.feature")
MESSAGES = $(patsubst features/%.feature,features/%.ndjson,$(FEATURE_FILES))

.tested: $(MESSAGES)

clean: clean-messages

clean-messages:
	rm -rf features/*.ndjson

features/%.ndjson: features/%.feature
	mkdir -p $(@D)
	./scripts/fake-cucumber.sh $< > $@
