include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.deps: messages.go

messages.go: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/go.go.erb ../jsonschema/scripts/templates/go.enum.go.erb
	ruby ../jsonschema/scripts/codegen.rb Go ../jsonschema go.go.erb > $@
	ruby ../jsonschema/scripts/codegen.rb Go ../jsonschema go.enum.go.erb >> $@
