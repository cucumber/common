include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

.codegen: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb ../jsonschema/scripts/templates/java.java.erb ../jsonschema/scripts/templates/java.enum.java.erb
	ruby ../jsonschema/scripts/codegen.rb Java ../jsonschema java.java.erb > Generated.java.tmp
	ruby ../jsonschema/scripts/codegen.rb Java ../jsonschema java.enum.java.erb >> Generated.java.tmp
	csplit --quiet --prefix=Generated --suffix-format=%02d.java.tmp --elide-empty-files Generated.java.tmp /^.*.java$$/ {*}
	rm Generated.java.tmp
	rm -rf src/generated/java/io/cucumber/messages/types
	mkdir --parents src/generated/java/io/cucumber/messages/types
	for file in Generated**; do tail -n +2 $$file > src/generated/java/io/cucumber/messages/types/$$(head -n 1 $$file); rm $$file; done
