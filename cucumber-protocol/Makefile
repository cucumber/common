SHELL := /usr/bin/env bash
PNML_FILES=$(wildcard src/*.xml)

default: .rspec pngs

.rspec: lib/petri_net.rb spec/petri_net_spec.rb
	bundle exec rspec
	touch $@

Gemfile.lock: Gemfile
	bundle install
	touch $@

pngs: $(patsubst %.xml,%.png,$(PNML_FILES))
.PHONY: pngs

%.dot: %.xml Gemfile.lock scripts/pnml2dot
	cat $< | scripts/pnml2dot > $@

%.svg: %.dot Gemfile.lock scripts/draw-tokens
	dot -T svg $< -o $@.tmp.svg
	cat $@.tmp.svg | scripts/draw-tokens > $@
	rm $@.tmp.svg

%.png: %.svg
	cairosvg --output-width 800 --output $@ $<

clean:
	rm -f src/*.{dot,svg,png} .rspec
.PHONY: clean
