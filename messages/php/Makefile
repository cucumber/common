include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

clean: clean-build

.codegen: build/messages.php

clean-build:
	rm -rf build/messages.php
	rm -rf src-generated/*

build/messages.php: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/php.php.erb
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
