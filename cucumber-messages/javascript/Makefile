include default.mk

.deps: src/cucumber-messages.js src/cucumber-messages.d.ts
	touch $@

src/cucumber-messages.js: messages.proto
	./node_modules/.bin/pbjs --target static-module --wrap commonjs $< --out $@

src/cucumber-messages.d.ts: src/cucumber-messages.js
	./node_modules/.bin/pbts $< --out $@.orig
	# Make the types stricter by not allowing null/undefined properties.
	cat $@.orig | ruby -e "puts(STDIN.read.gsub(/([\w]+)\?: \(([\w\.\[\]]+)\|null\)/, '\1: \2'))" > $@
	rm $@.orig

clean:
	rm -rf src/cucumber-messages.js src/cucumber-messages.d.ts

