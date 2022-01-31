include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

clean: clean-build

.codegen: build/messages.php

clean-build:
	rm -rf build
	rm -rf src-generated

build/messages.php: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/php.php.erb
	mkdir -p build
	mkdir -p src-generated
	ruby ../jsonschema/scripts/codegen.rb Php ../jsonschema php.php.erb > $@
	ruby ../jsonschema/scripts/codegen.rb Php ../jsonschema php.enum.php.erb >> $@
	rm -rf src-generated/*
	php split_classes.php
	vendor/bin/php-cs-fixer --diff fix src-generated

.tested: .cs-fixer

.cs-fixer:
	vendor/bin/php-cs-fixer --dry-run --diff fix src
	vendor/bin/php-cs-fixer --dry-run --diff fix src-generated
	vendor/bin/php-cs-fixer --dry-run --diff fix tests
