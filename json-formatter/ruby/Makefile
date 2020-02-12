include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

CCK_PATH = ../../compatibility-kit
CCK_FEATURES=$(call rwildcard,$(CCK_PATH)/javascript/features,*.feature)
FEATURES=$(patsubst $(CCK_PATH)/javascript/%,%,$(CCK_FEATURES))
STEP_DEFINITIONS=$(patsubst %.feature,%_steps.rb,$(FEATURES))
JSONS_GOLDEN  = $(patsubst features/%.feature,features/%.json,$(FEATURES))

.tested: $(JSONS_GOLDEN)# features/all.json

features/all.json: $(FEATURE_FILES) $(STEP_DEFINITIONS)
	-bundle exec cucumber --format json | \
		./neutralize-json | \
		jq --sort-keys "." > \
		$@

features/%.json: features/%-unprocessed.json
	cat $< | jq --sort-keys "." | ./neutralize-json > $@

features/%-unprocessed.json: features/%.feature features/%_steps.rb
	-bundle exec cucumber $< --require $(patsubst %-unprocessed.json,%_steps.rb,$@) --format=json > $@

features/%_steps.rb: $(CCK_PATH)/ruby/features/%_steps.rb
	mkdir -p $$(dirname $@)
	cp $(patsubst %,$(CCK_PATH)/ruby/%,$@) $@

# Dirty hack: the Ruby version we use do not support the Rule keyword.
features/rules/rules.feature:
	mkdir -p $$(dirname $@)
	echo "Feature: Rules" > $@

features/%.feature: $(CCK_PATH)/javascript/features/%.feature
	mkdir -p $$(dirname $@)
	cp $(patsubst %,$(CCK_PATH)/javascript/%,$@) $@

clean:
	rm -f $(FEATURES) $(STEP_DEFINITIONS) $(JSONS_GOLDEN) features/all.json
