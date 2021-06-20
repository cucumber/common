LANGUAGES ?= go javascript ruby java perl python dotnet
include default.mk

post-release: print-documentation-instructions

print-documentation-instructions:
	@echo -e "\033[0;34m*** Remember to update gherkin documentation. See: https://github.com/cucumber/docs/tree/main/layouts/shortcodes ***\033[0m"
.PHONY: print-documentation-instructions
