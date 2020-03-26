include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

RUBY_JSONS=$(call rwildcard,../ruby/acceptance,*.json)
RUBY_NDJSONS=$(patsubst ../ruby/acceptance/%.json,acceptance/ruby/%.ndjson,$(RUBY_JSONS))
RUBY_HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(RUBY_NDJSONS))
RUBY_GENERATED_JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.json,$(RUBY_NDJSONS))

JS_JSONS=$(call rwildcard,../javascript-json/acceptance,*.json)
JS_NDJSONS=$(patsubst ../javascript-json/acceptance/%.json,acceptance/javascript/%.ndjson,$(JS_JSONS))
JS_HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(JS_NDJSONS))
JS_GENERATED_JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.json,$(JS_NDJSONS))


.tested: reports

reports: ruby_reports js_reports

ruby_reports: $(RUBY_HTMLS) $(RUBY_GENERATED_JSONS) acceptance/ruby/all.ndjson.html

acceptance/ruby/all.ndjson: $(RUBY_NDJSONS)
	mkdir -p $(@D)
	cat $^ > $@

acceptance/ruby/%.ndjson: ../ruby/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages > $@

js_reports: $(JS_HTMLS) $(JS_GENERATED_JSONS) acceptance/javascript/all.ndjson.html

acceptance/javascript/all.ndjson: $(JS_NDJSONS)
	mkdir -p $(@D)
	cat $^ > $@

acceptance/javascript/%.ndjson: ../javascript-json/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages > $@


acceptance/%.ndjson.json: acceptance/%.ndjson
	mkdir -p $(@D)
	../../compatibility-kit/scripts/run-formatter \
                -e .json \
                -o $(@D) \
                -c "../../compatibility-kit/scripts/cucumber-json-formatter" \
                $<

acceptance/%.ndjson.html: acceptance/%.ndjson
	mkdir -p $(@D)
	../../compatibility-kit/scripts/run-formatter \
                -e .html \
                -o $(@D) \
                -c "../../compatibility-kit/scripts/cucumber-html-formatter" \
                $<
