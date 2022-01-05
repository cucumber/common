include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")
TEMPLATES = $(shell find ../jsonschema/scripts/templates -name "*.erb")

.codegen: src/main/java/io/cucumber/messages/Messages.java

src/main/java/io/cucumber/messages/Messages.java: $(JSONSCHEMAS) $(TEMPLATES) ../jsonschema/scripts/codegen.rb
	ruby ../jsonschema/scripts/codegen.rb Java ../jsonschema > $@

clean:
	rm -f src/main/java/io/messages/cucumber/Messages.java
