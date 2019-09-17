FEATURE_FILES = $(wildcard features/*.feature)
RUBY_FILES = $(wildcard features/step_definitions/*.rb)
JSONS_GOLDEN  = $(patsubst features/%.feature,features/%.json,$(FEATURE_FILES))

default: $(JSONS_GOLDEN) features/all.json

features/all.json: $(FEATURE_FILES)
	-bundle exec cucumber --format json $^ | \
	./neutralize-json | \
	jq --sort-keys "." > \
	$@

features/%_basic.json: features/%.feature $(RUBY_FILES) Gemfile.lock
	-bundle exec cucumber --format json $< > $@

features/%_neutralized.json: features/%_basic.json
	cat $< | ./neutralize-json > $@

features/%.json: features/%_neutralized.json
	cat $< | jq --sort-keys "." > $@

Gemfile.lock: Gemfile
	bundle install

clean:
	rm -f $(JSONS_GOLDEN) features/all.json Gemfile.lock
