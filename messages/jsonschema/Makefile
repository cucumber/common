JSONSCHEMAS = $(shell find . -name "*.json")

default:
	@for f in $(JSONSCHEMAS); do (cat "$$f" | jq '.' >> "$$f".pretty && mv "$$f".pretty "$$f") || exit 1 ; done
.PHONY: default
