include default.mk

FEATURE_FILES = $(sort $(wildcard ../../compatibility-kit/javascript/features/**/*.ndjson))
TS_MESSAGE_FILES = $(patsubst ../../compatibility-kit/javascript/features/%.ndjson,acceptance/%.ts,$(FEATURE_FILES))

.codegen: $(TS_MESSAGE_FILES)

# Convert an .ndjson file to a .ts file with Envelope objects that can be imported
acceptance/%.ts: ../../compatibility-kit/javascript/features/%.ndjson Makefile
	mkdir -p $(@D)
	echo "// Generated file. Do not edit." > $@
	echo "export default [" >> $@
	cat $< | sed "s/$$/,/" >> $@
	echo "]" >> $@

.tested: .tested-storybook

.tested-storybook: $(TYPESCRIPT_SOURCE_FILES)
	npm run build-storybook
	touch $@

clean:
	rm -f $(GHERKIN_DOCUMENT_NDJSON_FILES)
