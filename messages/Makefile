LANGUAGES ?= javascript go java ruby python dotnet
include default.mk

ifndef ALPINE
# Rebuild the docs unless we're already running in the build docker image (running
# docker from docker doesn't work).
default: .validated messages.md
else
default: .validated
endif

.validated:
	cd jsonschema && npx ajv compile --spec=draft2020 --strict=true \
		-s "Source.json" \
		-s "Attachment.json" \
		-s "Location.json" \
		-s "SourceReference.json" \
		-s "Hook.json" \
		-s "GherkinDocument.json" \
		-s "Meta.json" \
		-s "ParameterType.json" \
		-s "ParseError.json" \
		-s "Pickle.json" \
		-s "StepDefinition.json" \
		-s "TestCase.json" \
		-s "Timestamp.json" \
		-s "TestCaseFinished.json" \
		-s "TestCaseStarted" \
		-s "TestRunFinished.json" \
		-s "TestRunStarted.json" \
		-s "Duration.json" \
		-s "TestStepFinished.json" \
		-s "TestStepStarted.json" \
		-s "UndefinedParameterType.json" \
		-s "Envelope.json"
.PHONY: .validated

messages.md: messages.proto
	docker run --rm -v $$(pwd):/out -v $$(pwd):/protos pseudomuto/protoc-gen-doc --doc_opt=markdown,$@
