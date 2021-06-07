# The order is significant - ajv needs referenced schemas to be preceded by referencing schemas
SCHEMA_FILES = Source.json Attachment.json Location.json SourceReference.json Hook.json GherkinDocument.json Meta.json ParameterType.json ParseError.json Pickle.json StepDefinition.json TestCase.json Timestamp.json TestCaseFinished.json TestCaseStarted.json TestRunFinished.json TestRunStarted.json Duration.json TestStepFinished.json TestStepStarted.json UndefinedParameterType.json Envelope.json
OPTIONS = $(patsubst %,-s %,$(SCHEMA_FILES))

default: .validated

.validated: $(SCHEMA_FILES)
	npx ajv compile --spec=draft2020 --strict=true $(OPTIONS)
	mkdir -p $(@D)
	touch $@

## General targets called by parent makefiles

pre-release:

update-dependencies:

update-version:

publish:

post-release:

clean:
	rm -f .validates

.PHONY: pre-release update-dependencies update-version publish post-release clean
