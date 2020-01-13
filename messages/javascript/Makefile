include default.mk

.codegen: src/messages.d.ts

src/messages.js: messages.proto
	npm run pbjs

src/messages.d.ts: src/messages.js
	npm run pbts
	cat <(echo "/* eslint-disable */") $@ > $@.tmp
	mv $@.tmp $@

clean:
	rm -rf dist src/messages.js src/messages.d.ts

