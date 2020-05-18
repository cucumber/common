include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

FEATURES=$(call rwildcard,features,*.feature)
NDJSONS=$(patsubst features/%.feature,acceptance/%.ndjson,$(FEATURES))
HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(NDJSONS))
JSONS=$(patsubst features/%.feature,acceptance/%.json,$(FEATURES))

.tested: $(NDJSONS) $(JSONS)

reports: $(HTMLS) acceptance/all.ndjson.html

acceptance/all.ndjson: $(NDJSONS)
	cat $^ > $@

acceptance/%.ndjson.html: acceptance/%.ndjson
	../../compatibility-kit/scripts/run-formatter \
                -e .html \
                -o $(@D) \
                -c "../../compatibility-kit/scripts/cucumber-html-formatter" \
                $<


acceptance/%.json: features/%.feature features/%_steps.rb
	mkdir -p $(@D)
	-bundle exec cucumber $< --require $(patsubst %.feature,%_steps.rb,$<) --format json | jq -S > $@

acceptance/%.ndjson: features/%.feature features/%_steps.rb
	mkdir -p $(@D)
	-bundle exec cucumber $< --require $(patsubst %.feature,%_steps.rb,$<) --format message > $@

clean:
	rm -rf acceptance
