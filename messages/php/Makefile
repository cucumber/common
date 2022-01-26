
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

test: .deps
	vendor/bin/psalm
	vendor/bin/phpunit
