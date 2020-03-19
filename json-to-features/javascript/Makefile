include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

FEATURE_FILES=$(call rwildcard,features,*.feature)
NDJSONS=$(patsubst features/%.feature,acceptance/%.ndjson,$(FEATURE_FILES))
JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.json,$(NDJSONS))

.tested: $(JSONS)

acceptance/%.json: acceptance/%.ndjson
	cat $^ | ../../compatibility-kit/scripts/cucumber-json-formatter > $@

acceptance/%.ndjson: features/%.feature
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber $^ --format ndjson > $@
