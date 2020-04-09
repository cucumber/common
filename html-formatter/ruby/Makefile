include default.mk
# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

SOURCE_FEATURES=$(call rwildcard,../javascript/features,*.feature)
FEATURES=$(patsubst ../javascript/%,%,$(SOURCE_FEATURES))
CCK_MESSAGES=$(call rwildcard,../../compatibility-kit/ruby,*.ndjson)

.deps: assets/cucumber-react.css assets/cucumber-html.js assets/index.mustache.html

.tested: acceptance/cck.html

acceptance/cck.html: $(CCK_MESSAGES)
	mkdir -p $(@D)
	echo $(CCK_MESSAGES)
	echo $^
	cat $^ | bundle exec bin/cucumber-html-formatter --format ndjson > $@

acceptance/cucumber.html: .deps $(FEATURES)
	mkdir -p $(@D)
	../../fake-cucumber/javascript/bin/fake-cucumber \
	  --format ndjson \
		features/*.feature | \
		bundle exec bin/cucumber-html-formatter --format ndjson > \
		$@

# TOOD: Replace this with .rsync
features/%.feature: ../javascript/features/%.feature
	cp $^ $@

assets/cucumber-react.css:
	mkdir -p $(@D)
	cp ../../react/javascript/dist/src/styles/cucumber-react.css $@

assets/cucumber-html.js:
	mkdir -p $(@D)
	cp ../javascript/dist/main.js $@

assets/index.mustache.html:
	mkdir -p $(@D)
	cp ../javascript/dist/src/index.mustache.html $@


clean:
	rm -rf acceptance $(FEATURES) assets/*.css assets/*.js assets/*.html