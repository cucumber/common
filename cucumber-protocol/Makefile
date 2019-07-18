SHELL := /usr/bin/env bash
PNML_FILES=$(wildcard src/*.xml)

default: pngs

Gemfile.lock: Gemfile
	bundle install
	touch $@

pngs: $(patsubst %.xml,%.png,$(PNML_FILES))
.PHONY: pngs

%.dot: %.xml Gemfile.lock scripts/pnml2dot
	cat $< | scripts/pnml2dot > $@

%.svg: %.dot Gemfile.lock scripts/petri-places
	dot -T svg $< -o $@.tmp.svg
	cat $@.tmp.svg | scripts/petri-places > $@
	rm $@.tmp.svg

%.png: %.svg
	cairosvg --output-width 800 --output $@ $<

clean:
	rm -f src/*.{dot,svg,png}
.PHONY: clean
