LICENSE: ../../LICENSE
	cp $< $@

.PHONY: release
release:
	npm publish
	version=$$(jq -r ".version" package.json); \
	git tag --annotate v$$version --message "Release $$version"
