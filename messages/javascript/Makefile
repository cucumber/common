include default.mk

.deps: index.js
	touch $@

index.js: messages.proto
	./node_modules/.bin/pbjs --target static-module --wrap commonjs $< --out $@

clean:
	rm -rf index.js

