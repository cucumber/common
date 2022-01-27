
JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

clean:
	rm -rf vendor composer.lock build/messages.php

.deps: composer.lock build/messages.php

composer.lock:
	composer install

build/messages.php: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/php.php.erb
	ruby ../jsonschema/scripts/codegen.rb Php ../jsonschema > $@
	rm -rf src-generated/*
	php split_classes.php
	vendor/bin/php-cs-fixer --diff fix src-generated

test: .deps
	vendor/bin/php-cs-fixer --dry-run --diff fix src
	vendor/bin/php-cs-fixer --dry-run --diff fix src-generated
	vendor/bin/php-cs-fixer --dry-run --diff fix tests
	vendor/bin/psalm
	vendor/bin/phpunit
