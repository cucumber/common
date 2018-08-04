include default.mk

.deps: src/cucumber-messages.js
	touch $@

src/cucumber-messages.js: messages.proto
	./node_modules/.bin/pbjs --target static-module --wrap commonjs $< --out $@

clean:
	rm -rf index.js

