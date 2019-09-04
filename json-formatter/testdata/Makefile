FEATURE_FILES = $(wildcard features/*.feature)
JSONS_GOLDEN  = $(patsubst features/%.feature,features/%.json,$(FEATURE_FILES))

default: $(JSONS_GOLDEN)

features/%.json: features/%.feature
	-bundle exec cucumber --format json $< > $@

clean:
	rm -f $(JSONS_GOLDEN)