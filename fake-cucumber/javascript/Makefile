include default.mk

FEATURE_FILES = $(shell find features -name "*.feature")
MESSAGES = $(patsubst features/%.feature,features/%.bin,$(FEATURE_FILES))

.tested: $(MESSAGES)

features/%.bin: features/%.feature
	mkdir -p `dirname $@`
	./bin/fake-cucumber $< > $@
