SHELL := /usr/bin/env bash

default: mocha
.PHONY: default

mocha: yarn.lock index.js
	yarn test
.PHONY: mocha

index.js: messages.proto
	./node_modules/.bin/pbjs --target static-module --wrap commonjs $< --out $@

clean:
	rm -f index.js
.PHONY: clean

yarn.lock: package.json
	yarn
	touch $@
