include default.mk

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

JSONS=$(call rwildcard,../ruby/acceptance,*.json)
NDJSONS=$(patsubst ../ruby/acceptance/%.json,acceptance/%.ndjson,$(JSONS))
HTMLS=$(patsubst acceptance/%.ndjson,acceptance/%.ndjson.html,$(NDJSONS))

.tested: reports

reports: $(HTMLS)

acceptance/%.ndjson.html: acceptance/%.ndjson
	mkdir -p $(@D)
	../../compatibility-kit/scripts/run-formatter \
                -e .html \
                -o $(@D) \
                -c "../../compatibility-kit/scripts/cucumber-html-formatter" \
                $<

acceptance/%.ndjson: ../ruby/acceptance/%.json $(TYPESCRIPT_SOURCE_FILES)
	mkdir -p $(@D)
	cat ../ruby/acceptance/statuses/statuses.json | bin/json-to-messages > $@
