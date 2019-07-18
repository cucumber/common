PNML_FILES=$(wildcard src/*.xml)

default: pngs

pngs: $(patsubst %.xml,%.png,$(PNML_FILES))
.PHONY: pngs

%.dot: %.xml
	cat $< | scripts/pnml2dot > $@

%.svg: %.dot
	dot -T svg $< -o $@.tmp
	cat $@.tmp | scripts/petri-places > $@
	rm $@.tmp

%.png: %.svg
	cairosvg --output-width 800 --output $@ $< 