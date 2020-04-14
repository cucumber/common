include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

RUBY_FEATURES=$(call rwildcard,../ruby/features,*.feature)
FEATURES=$(patsubst ../ruby/features/%.feature,src/test/resources/io/cucumber/json/%.feature,$(RUBY_FEATURES))
JSONS=$(patsubst src/test/resources/io/cucumber/json/%.feature,acceptance/%.json,$(FEATURES))

default: $(JSONS)

acceptance/%.json: src/test/resources/io/cucumber/json/%.feature
	mkdir -p $(@D)
	-mvn test -Dcucumber.features="$<" -Dcucumber.plugin="json:$@"

src/test/resources/io/cucumber/json/%.feature: ../ruby/features/%.feature
	mkdir -p $(@D)
	cp $^ $@