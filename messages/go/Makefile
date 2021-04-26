include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")
GOGO_PROTOBUF_VERSION=v0.8.0

.deps: messages.go

.go-get:
	go get github.com/atombender/go-jsonschema@$(GOGO_PROTOBUF_VERSION)
	touch $@

# messages.go: $(JSONSCHEMAS) .go-get
# 	pushd ../jsonschema && $(GOPATH)/bin/gojsonschema \
# 		--schema-package=http://json-schema.org/draft-04/schema\#=tmp \
# 		-p messages *.json > ../go/messages.go

messages.go: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb
	ruby ../jsonschema/scripts/codegen.rb Go ../jsonschema > $@

clean:
	rm -f .go-get
