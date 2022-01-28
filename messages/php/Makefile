include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

clean:
	rm -rf build

.codegen: build/messages.php

build/messages.php: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/php.php.erb
	ruby ../jsonschema/scripts/codegen.rb Php ../jsonschema > $@
	rm -rf src-generated/*
	php split_classes.php
	vendor/bin/php-cs-fixer --diff fix src-generated

.tested: .cs-fixer

.cs-fixer:
	vendor/bin/php-cs-fixer --dry-run --diff fix src
	vendor/bin/php-cs-fixer --dry-run --diff fix src-generated
	vendor/bin/php-cs-fixer --dry-run --diff fix tests
