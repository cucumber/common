include default.mk

FEATURE_FILES = $(sort $(wildcard features/*.feature))
RUBY_FILES = $(sort $(wildcard features/step_definitions/*.rb))
JSONS_GOLDEN  = $(patsubst features/%.feature,features/%.json,$(FEATURE_FILES))

.tested: $(JSONS_GOLDEN) features/all.json

features/all.json: $(FEATURE_FILES)
	# The cucumber tests are deliberately failing, so let make continue
	-bundle exec cucumber --format json $^ | \
	./neutralize-json | \
	jq --sort-keys "." > \
	$@

features/%.json: features/%_neutralized.json
	cat $< | jq --sort-keys "." > $@

features/%_neutralized.json: features/%_unprocessed.json
	cat $< | ./neutralize-json > $@

features/%_unprocessed.json: features/%.feature $(RUBY_FILES) Gemfile.lock
	# The cucumber tests are deliberately failing, so let make continue
	-bundle exec cucumber --format json $< > $@

clean:
	rm -f features/*.json
