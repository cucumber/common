include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.codegen: src/main/java/io/cucumber/messages/Messages.java

src/main/java/io/cucumber/messages/Messages.java: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/java.java.erb ../jsonschema/scripts/templates/java.enum.java.erb
	echo "package io.cucumber.messages;" > $@
	echo >> $@
	echo "import com.fasterxml.jackson.annotation.JsonCreator;" >> $@
	echo >> $@
	echo "public final class Messages {" >> $@
	echo >> $@
	echo "    private Messages() {}" >> $@
	echo >> $@
	ruby ../jsonschema/scripts/codegen.rb Java ../jsonschema java.java.erb >> $@
	ruby ../jsonschema/scripts/codegen.rb Java ../jsonschema java.enum.java.erb >> $@
	echo "}" >> $@
