include default.mk

RUBY_FEATURES=$(call rwildcard,../ruby-testdata/features,*.feature)
FEATURES=$(patsubst ../ruby-testdata/features/%.feature,features/%.feature,$(RUBY_FEATURES))
JSONS=$(patsubst features/%.feature,acceptance/%.json,$(FEATURES))

default: .tested

.tested: $(JSONS)

acceptance/%.json: features/%.feature
	mkdir -p $(@D)
	-behave $< --format=json -o $@

features/parameters/parameters.feature:
	# no-op

features/%.feature: ../ruby-testdata/features/%.feature
	mkdir -p $(@D)
	cp $^ $@

clean:
	rm -rf features/hooks/hooks.feature features/statuses/statuses.feature acceptance