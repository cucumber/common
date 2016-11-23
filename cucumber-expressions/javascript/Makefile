.PHONY: build
build:
	npm install
	npm test

.PHONY: release
release:
	npm install
	npm publish
	version=$$(jq -r ".version" package.json); \
	git tag --annotate v$$version --message "Release $$version"
	git push --tags
