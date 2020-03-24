include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

FEATURES=$(call rwildcard,features,*.feature)
NDJSONS=$(patsubst features/%.feature,acceptance/%.ndjson,$(FEATURES))
JSONS=$(patsubst features/%.feature,acceptance/%.json,$(FEATURES))

.tested: $(NDJSONS) $(JSONS)

acceptance/%.json: features/%.feature features/%_steps.rb
	mkdir -p $(@D)
	-bundle exec cucumber $< --require $(patsubst %.feature,%_steps.rb,$<) --format json > $@

acceptance/%.ndjson: features/%.feature features/%_steps.rb
	mkdir -p $(@D)
	-bundle exec cucumber $< --require $(patsubst %.feature,%_steps.rb,$<) --format message > $@

clean:
	rm -rf acceptance
