include default.mk

.deps: lib/gherkin/parser.ex

BERP_GRAMMAR = resources/gherkin.berp

lib/gherkin/parser.ex: gherkin-elixir.razor $(BERP_GRAMMAR)
	$(berp-generate-parser)

clobber: clean
	rm -f lib/gherkin/parser.ex
