include default.mk

.deps: lib/gherkin/parser.ex

lib/gherkin/parser.ex: gherkin-elixir.razor resources/gherkin.berp
	$(berp-generate-parser)

clobber: clean
	rm -f lib/gherkin/parser.ex
