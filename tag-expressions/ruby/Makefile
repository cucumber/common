LICENSE: ../../LICENSE
	cp $< $@

.PHONY: release
release:
	gem push cucumber-tag_expressions.gemspec
	version=$$(cat cucumber-tag_expressions.gemspec | grep -m 1 ".version *= *" | sed "s/.*= *'\([^']*\)'.*/\1/"); \
	echo git tag --annotate v$$version --message "Release $$version"
