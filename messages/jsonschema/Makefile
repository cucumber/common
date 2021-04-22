JSONSCHEMAS = $(shell find . -name "*.jsonschema")

default:
	@for f in $(JSONSCHEMAS); do (cat "$$f" | jq '.' >> "$$f".pretty && mv "$$f".pretty "$$f") || exit 1 ; done
.PHONY: default
