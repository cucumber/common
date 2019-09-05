FEATURE_FILES = $(wildcard features/*.feature)
RUBY_FILES = $(wildcard features/step_definitions/*.rb)
JSONS_GOLDEN  = $(patsubst features/%.feature,features/%.json,$(FEATURE_FILES))

default: $(JSONS_GOLDEN)

features/%.json: features/%.feature $(RUBY_FILES) Gemfile.lock
	-bundle exec cucumber --format json $< > $@

Gemfile.lock: Gemfile
	bundle install

clean:
	rm -f $(JSONS_GOLDEN) Gemfile.lock
