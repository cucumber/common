JSONSCHEMAS = $(shell find . -name "*.jsonschema")

default:
	@for f in $(JSONSCHEMAS); do (cat "$$f" | jq --sort-keys '.' >> "$$f".sorted && mv "$$f".sorted "$$f") || exit 1 ; done
.PHONY: default
