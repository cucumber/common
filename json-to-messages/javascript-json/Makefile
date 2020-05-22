include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

RUBY_FEATURES=$(call rwildcard,../ruby/features,*.feature)
FEATURES=$(patsubst ../ruby/features/%.feature,features/%.feature,$(RUBY_FEATURES))
JSONS=$(patsubst features/%.feature,acceptance/%.json,$(FEATURES))

.tested: $(JSONS)

acceptance/%.json: features/%.feature
	mkdir -p $(@D)
	-./node_modules/cucumber/bin/cucumber-js $^ -r $(patsubst features/%.feature,dist/features/%_steps.js,$<) --format json | jq -S > $@

features/%.feature: ../ruby/features/%.feature
	mkdir -p $(@D)
	cp $^ $@

clean:
	rm -rf features/**/*.feature acceptance