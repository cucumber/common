include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

FEATURES=$(call rwildcard,features,*.feature)
NDJSONS=$(patsubst features/%.feature,acceptance/%.ndjson,$(FEATURES))
JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.json,$(FEATURES))

.tested: $(NDJSONS) $(JSONS)

acceptance/%.json: features/%.feature
	mkdir -p $(@D)
	-bundle exec cucumber $< --require $(patsubst %.ndjson,%_steps.rb,$@) --format json > $@

acceptance/%.ndjson: features/%.feature
	mkdir -p $(@D)
	-bundle exec cucumber $< --require $(patsubst %.ndjson,%_steps.rb,$@) --format message > $@