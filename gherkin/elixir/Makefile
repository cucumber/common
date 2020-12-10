include default.mk

.deps: lib/gherkin/parser.ex

lib/gherkin/parser.ex: resources/gherkin.berp gherkin-elixir.razor
	mono  /var/lib/berp/1.1.1/tools/net471/Berp.exe -g resources/gherkin.berp -t gherkin-elixir.razor -o $@
	# Remove BOM
	awk 'NR==1{sub(/^\xef\xbb\xbf/,"")}{print}' < $@ > $@.nobom
	mv $@.nobom $@

clobber: clean
	rm -f lib/gherkin/parser.ex
