include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")
GOGO_PROTOBUF_VERSION=v0.8.0

.deps: messages.go

.go-get:
	go get github.com/atombender/go-jsonschema@$(GOGO_PROTOBUF_VERSION)
	touch $@

messages.go: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb
	ruby ../jsonschema/scripts/codegen.rb Go ../jsonschema > $@

clean:
	rm -f .go-get
