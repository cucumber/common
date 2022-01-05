# The order is significant - ajv needs referenced schemas to be preceded by referencing schemas
SCHEMA_FILES = Source.json Attachment.json Location.json SourceReference.json Hook.json GherkinDocument.json Meta.json ParameterType.json ParseError.json Pickle.json StepDefinition.json TestCase.json Timestamp.json TestCaseFinished.json TestCaseStarted.json TestRunFinished.json TestRunStarted.json Duration.json TestStepFinished.json TestStepStarted.json UndefinedParameterType.json Envelope.json
OPTIONS = $(patsubst %,-s %,$(SCHEMA_FILES))

default: .validated ../messages.md

.validated: $(SCHEMA_FILES) ../../node_modules ../../package-lock.json
	../../node_modules/.bin/ajv compile --spec=draft2020 --strict=true $(OPTIONS)
	mkdir -p $(@D)
	touch $@

../../node_modules ../../package-lock.json:
	cd ../.. && npm install

../messages.md: $(SCHEMA_FILES) ./scripts/codegen.rb ./scripts/templates/typescript.ts.erb ./scripts/templates/typescript.enum.ts.erb
	ruby ./scripts/codegen.rb Markdown . markdown.md.erb > $@
	ruby ./scripts/codegen.rb Markdown . markdown.enum.md.erb >> $@

## General targets called by parent makefiles

pre-release:

update-dependencies:

update-version:

publish:

post-release:

clean:
	rm -f .validates

.PHONY: pre-release update-dependencies update-version publish post-release clean
