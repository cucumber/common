LICENSE: ../../LICENSE
	cp $< $@

.PHONY: release
release:
	npm deploy
	version=$$(jq -r ".version" package.json); \
	echo git tag --annotate v$$version --message "Release $$version"
