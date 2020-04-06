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

PYTHON_JSONS=$(call rwildcard,../python/acceptance,*.json)
PYTHON_NDJSONS=$(patsubst ../python/acceptance/%.json,acceptance/python/%.ndjson,$(PYTHON_JSONS))
PYTHON_HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(PYTHON_NDJSONS))
PYTHON_GENERATED_JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.json,$(PYTHON_NDJSONS))


.tested: reports

reports: ruby_reports js_reports python_reports

ruby_reports: $(RUBY_HTMLS) $(RUBY_GENERATED_JSONS) acceptance/ruby/all.ndjson.html

acceptance/ruby/all.ndjson: $(RUBY_NDJSONS)
	mkdir -p $(@D)
	cat $^ > $@

acceptance/ruby/%.ndjson: ../ruby/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages --lang ruby > $@

js_reports: $(JS_HTMLS) $(JS_GENERATED_JSONS) acceptance/javascript/all.ndjson.html

acceptance/javascript/all.ndjson: $(JS_NDJSONS)
	mkdir -p $(@D)
	cat $^ > $@

acceptance/javascript/%.ndjson: ../javascript-json/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages --lang js > $@

python_reports: $(PYTHON_HTMLS) $(PYTHON_GENERATED_JSONS) acceptance/python/all.ndjson.html

acceptance/python/all.ndjson: $(PYTHON_NDJSONS)
	mkdir -p $(@D)
	cat $^ > $@

acceptance/python/%.ndjson: ../python/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages --lang behave > $@


acceptance/%.ndjson.json: acceptance/%.ndjson
	mkdir -p $(@D)
	-../../compatibility-kit/scripts/run-formatter \
                -e .json \
                -o $(@D) \
                -c "../../compatibility-kit/scripts/cucumber-json-formatter" \
                $<

acceptance/%.ndjson.html: acceptance/%.ndjson
	mkdir -p $(@D)
	-../../compatibility-kit/scripts/run-formatter \
                -e .html \
                -o $(@D) \
                -c "../../compatibility-kit/scripts/cucumber-html-formatter" \
                $<
