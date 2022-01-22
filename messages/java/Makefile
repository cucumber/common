include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.codegen: src/main/java/io/cucumber/messages/Messages.java

src/main/java/io/cucumber/messages/Messages.java: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/java.java.erb ../jsonschema/scripts/templates/java.enum.java.erb
	echo "package io.cucumber.messages;" > $@
	echo >> $@
	echo "import java.util.ArrayList;" >> $@
	echo "import java.util.Objects;" >> $@
	echo "import java.util.Optional;" >> $@
	echo >> $@
	echo "import static java.util.Collections.unmodifiableList;" >> $@
	echo "import static java.util.Objects.requireNonNull;" >> $@
	echo >> $@
	echo "@SuppressWarnings(\"unused\")" >> $@
	echo "public final class Messages {" >> $@
	echo >> $@
	echo "    private Messages() {}" >> $@
	echo >> $@
	ruby ../jsonschema/scripts/codegen.rb Java ../jsonschema java.java.erb >> $@
	ruby ../jsonschema/scripts/codegen.rb Java ../jsonschema java.enum.java.erb >> $@
	echo "}" >> $@
