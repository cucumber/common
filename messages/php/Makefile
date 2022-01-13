
JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.deps: src/generated/messages.php

src/generated/messages.php: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/php.php.erb
	ruby ../jsonschema/scripts/codegen.rb Php ../jsonschema > $@

test: .deps
	vendor/bin/psalm
	vendor/bin/phpunit
