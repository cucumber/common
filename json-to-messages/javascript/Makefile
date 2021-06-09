include default.mk

RUBY_JSONS=$(call rwildcard,../ruby-testdata/acceptance,*.json)
RUBY_NDJSONS=$(patsubst ../ruby-testdata/acceptance/%.json,acceptance/ruby/%.ndjson,$(RUBY_JSONS))
RUBY_HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(RUBY_NDJSONS))
RUBY_GENERATED_JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.json,$(RUBY_NDJSONS))

JS_JSONS=$(call rwildcard,../javascript-testdata/acceptance,*.json)
JS_NDJSONS=$(patsubst ../javascript-testdata/acceptance/%.json,acceptance/javascript/%.ndjson,$(JS_JSONS))
JS_HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(JS_NDJSONS))
JS_GENERATED_JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.json,$(JS_NDJSONS))

JAVA_JSONS=$(call rwildcard,../java-testdata/acceptance,*.json)
JAVA_NDJSONS=$(patsubst ../java-testdata/acceptance/%.json,acceptance/java/%.ndjson,$(JAVA_JSONS))
JAVA_HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(JAVA_NDJSONS))
JAVA_GENERATED_JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.json,$(JAVA_NDJSONS))

PYTHON_JSONS=$(call rwildcard,../python-testdata/acceptance,*.json)
PYTHON_NDJSONS=$(patsubst ../python-testdata/acceptance/%.json,acceptance/python/%.ndjson,$(PYTHON_JSONS))
PYTHON_HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(PYTHON_NDJSONS))
PYTHON_GENERATED_JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.json,$(PYTHON_NDJSONS))

.tested: reports

reports: ruby_reports js_reports java_reports python_reports

ruby_reports: $(RUBY_HTMLS) $(RUBY_GENERATED_JSONS) acceptance/ruby/all.ndjson.html

acceptance/ruby/all.ndjson: $(RUBY_NDJSONS)
ifeq ($(RUBY_NDJSONS),)
	# No JSONs made for Ruby
else
	mkdir -p $(@D)
	cat $^ > $@
endif

acceptance/ruby/%.ndjson: ../ruby-testdata/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages-dev > $@

js_reports: $(JS_HTMLS) $(JS_GENERATED_JSONS) acceptance/javascript/all.ndjson.html

acceptance/javascript/all.ndjson: $(JS_NDJSONS)
ifeq ($(JS_NDJSONS),)
	# No JSONs made for Javascript
else
	mkdir -p $(@D)
	cat $^ > $@
endif

acceptance/javascript/%.ndjson: ../javascript-testdata/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages-dev > $@

java_reports: $(JAVA_HTMLS) $(JAVA_GENERATED_JSONS) acceptance/java/all.ndjson.html

acceptance/java/all.ndjson: $(JAVA_NDJSONS)
ifeq ($(JAVA_NDJSONS),)
	# No JSONs made for Java
else
	mkdir -p $(@D)
	cat $^ > $@
endif

acceptance/java/%.ndjson: ../java-testdata/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages-dev > $@

python_reports: $(PYTHON_HTMLS) $(PYTHON_GENERATED_JSONS) acceptance/python/all.ndjson.html

acceptance/python/all.ndjson: $(PYTHON_NDJSONS)
ifeq ($(PYTHON_NDJSONS),)
	# No JSONs made for Python
else
	mkdir -p $(@D)
	cat $^ > $@
endif

acceptance/python/%.ndjson: ../python-testdata/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages-dev > $@

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
