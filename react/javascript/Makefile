include default.mk

FEATURE_FILES = $(sort $(wildcard ../../compatibility-kit/javascript/features/**/*.ndjson))
TS_MESSAGE_FILES = $(patsubst ../../compatibility-kit/javascript/features/%.ndjson,acceptance/%.ts,$(FEATURE_FILES))

.codegen: $(TS_MESSAGE_FILES) dist/src/styles/cucumber-react.css

dist/src/styles/cucumber-react.css: src/styles/styles.scss src/styles/react-accessible-accordion.css
	mkdir -p $(@D)
	./node_modules/.bin/sass $< > $@
	cat src/styles/react-accessible-accordion.css >> $@

# Convert an .ndjson file to a .ts file with Envelope objects that can be imported
acceptance/%.ts: ../../compatibility-kit/javascript/features/%.ndjson
	mkdir -p $(@D)
	echo "import { messages } from '@cucumber/messages'" > $@
	echo "export default [" >> $@
	cat $< | sed "s/$$/,/" >> $@
	echo "].map(ob => messages.Envelope.fromObject(ob))" >> $@

.tested: .tested-storybook

.tested-storybook: $(TYPESCRIPT_SOURCE_FILES)
	./node_modules/.bin/build-storybook
	touch $@

clean:
	rm -f $(GHERKIN_DOCUMENT_NDJSON_FILES)
