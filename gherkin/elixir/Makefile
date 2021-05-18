include default.mk

.deps: lib/gherkin/parser.ex

lib/gherkin/parser.ex: .berp_restored resources/gherkin.berp gherkin-elixir.razor
	berp -g resources/gherkin.berp -t gherkin-elixir.razor -o $@ --noBOM

clobber: clean
	rm -f lib/gherkin/parser.ex
