include default.mk

RUBY_FEATURES=$(call rwildcard,../ruby-testdata/features,*.feature)
FEATURES=$(patsubst ../ruby-testdata/features/%.feature,features/%.feature,$(RUBY_FEATURES))
JSONS=$(patsubst features/%.feature,acceptance/%.json,$(FEATURES))

.tested: $(JSONS)

acceptance/%.json: features/%.feature
	mkdir -p $(@D)
	-../../node_modules/.bin/cucumber-js $^ -r $(patsubst features/%.feature,dist/features/%_steps.js,$<) --format json | jq -S > $@

features/%.feature: ../ruby-testdata/features/%.feature
	mkdir -p $(@D)
	cp $^ $@

clean:
	rm -rf features/**/*.feature acceptance