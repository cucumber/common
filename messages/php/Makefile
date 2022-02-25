include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

clean: clean-build

.codegen: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/php.php.erb
	ruby ../jsonschema/scripts/codegen.rb Php ../jsonschema php.php.erb > build/messages.php
	ruby ../jsonschema/scripts/codegen.rb Php ../jsonschema php.enum.php.erb >> build/messages.php
	csplit --quiet --prefix=build/Generated --suffix-format=%02d.php.tmp --elide-empty-files build/messages.php /^.*[.]php$$/ {*}
	rm build/messages.php
	rm -rf src-generated/*
	for file in build/Generated**; do mkdir -p src-generated/$$(head -n 1 $$file | sed 's/[^/]*.php$$//'); done
	for file in build/Generated**; do tail -n +2 $$file > src-generated/$$(head -n 1 $$file); rm $$file; done
	vendor/bin/php-cs-fixer --diff fix src-generated

clean-build:
	rm -rf build/messages.php
	rm -rf src-generated/*

.tested: .cs-fixer

.cs-fixer:
	vendor/bin/php-cs-fixer --dry-run --diff fix src
	vendor/bin/php-cs-fixer --dry-run --diff fix src-generated
	vendor/bin/php-cs-fixer --dry-run --diff fix tests
