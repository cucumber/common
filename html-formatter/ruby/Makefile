include default.mk
# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

SOURCE_FEATURES=$(call rwildcard,../javascript/features,*.feature)
FEATURES=$(patsubst ../javascript/%,%,$(SOURCE_FEATURES))

.tested: acceptance/cucumber.html

features/%.feature: ../javascript/features/%.feature
	cp $^ $@

acceptance/cucumber.html: .deps $(FEATURES)
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
		bundle exec bin/html-formatter --format ndjson > \
		$@

clean:
	rm -rf acceptance $(FEATURES)