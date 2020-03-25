include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

JSONS=$(call rwildcard,../ruby/acceptance,*.json)
NDJSONS=$(patsubst ../ruby/acceptance/%.json,acceptance/%.ndjson,$(JSONS))
HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(NDJSONS))
GENERATED_JSONS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.json,$(NDJSONS))

.tested: reports

reports: $(HTMLS) $(GENERATED_JSONS)

acceptance/%.ndjson.json: acceptance/%.ndjson
	../../compatibility-kit/scripts/run-formatter \
                -e .json \
                -o $(@D) \
                -c "../../compatibility-kit/scripts/cucumber-json-formatter" \
                $<

acceptance/%.ndjson.html: acceptance/%.ndjson
	../../compatibility-kit/scripts/run-formatter \
                -e .html \
                -o $(@D) \
                -c "../../compatibility-kit/scripts/cucumber-html-formatter" \
                $<

acceptance/%.ndjson: ../ruby/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat $< | bin/json-to-messages > $@
