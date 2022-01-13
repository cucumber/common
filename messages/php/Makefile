
JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.deps: src/messages.dtos.php

src/messages.dtos.php: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/php.php.erb
	ruby ../jsonschema/scripts/codegen.rb Php ../jsonschema > $@
