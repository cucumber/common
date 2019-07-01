include default.mk

.codegen: src/cucumber-messages.js src/cucumber-messages.d.ts dist/src/cucumber-messages.js dist/src/cucumber-messages.d.ts
	touch $@

dist/src/cucumber-messages.js: src/cucumber-messages.js
	mkdir -p $(dir $@)
	cp $< $@

dist/src/cucumber-messages.d.ts: src/cucumber-messages.d.ts
	mkdir -p $(dir $@)
	cp $< $@

src/cucumber-messages.js: messages.proto
	./node_modules/.bin/pbjs --target static-module --wrap commonjs $< --out $@

src/cucumber-messages.d.ts: src/cucumber-messages.js
	./node_modules/.bin/pbts $< > $@

clean:
	rm -rf dist src/cucumber-messages.js src/cucumber-messages.d.ts

