SHELL := /usr/bin/env bash

default: mocha
.PHONY: default

mocha: yarn.lock index.js
	yarn test
.PHONY: mocha

index.js: messages.proto
	./node_modules/.bin/pbjs --target static-module --wrap commonjs $< --out $@

yarn.lock: package.json
	yarn
	touch $@

clean:
	rm -f index.js yarn.lock node_modules
.PHONY: clean

