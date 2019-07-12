include default.mk

.codegen: src/cucumber-messages.js src/cucumber-messages.d.ts

src/cucumber-messages.js: messages.proto
	npm run pbjs

src/cucumber-messages.d.ts: src/cucumber-messages.js
	npm run pbts

clean:
	rm -rf dist src/cucumber-messages.js src/cucumber-messages.d.ts

