include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

CCK_PATH = ../../compatibility-kit
CCK_FEATURES=$(call rwildcard,$(CCK_PATH)/javascript/features,*.feature)
FEATURES=$(patsubst $(CCK_PATH)/javascript/%,%,$(CCK_FEATURES))
STEP_DEFINITIONS=$(patsubst %.feature,%.ts,$(FEATURES))
NDJSONS_GOLDEN  = $(patsubst features/%.feature,features/%.ndjson,$(FEATURES))

.tested: $(NDJSONS_GOLDEN)

# Dirty hack: the Ruby version we use do not support the Rule keyword, so we'll also produce an empty one here.
features/rules/rules.feature:
	mkdir -p $$(dirname $@)
	echo "Feature: Rules" > $@

features/%.ndjson: features/%.feature features/%.ts .deps
	./node_modules/@cucumber/fake-cucumber/bin/fake-cucumber \
		--format ndjson \
		--predictable-ids \
		$< > $@

features/%.ts: $(CCK_PATH)/javascript/features/%.ts
	mkdir -p $$(dirname $@)
	cp $(patsubst %,$(CCK_PATH)/javascript/%,$@) $@

features/%.feature: $(CCK_PATH)/javascript/features/%.feature
	mkdir -p $$(dirname $@)
	cp $(patsubst %,$(CCK_PATH)/javascript/%,$@) $@

clean:
	rm -f $(FEATURES) $(STEP_DEFINITIONS) $(NDJSONS_GOLDEN)
