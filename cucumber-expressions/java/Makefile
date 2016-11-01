.PHONY: release
release:
	mvn -P release-sign-artifacts clean source:jar javadoc:jar deploy
	version=$$(xmllint --xpath "//*[local-name()='project']/*[local-name()='version']/text()" pom.xml); \
	git tag --annotate v$$version --message "Release $$version"
	git push --tags
	echo "Log into https://oss.sonatype.org, close and release manually"
	echo "Then bump version in pom.xml in the monorepo, commit and push"
