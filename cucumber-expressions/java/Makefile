# Please update /.templates/java/.travis.yml in the cucumber/cucumber monorepo
# and sync:
#
#     source scripts/functions.sh && rsync_files
#
default: .built
.PHONY: default

.built: pom.xml
	mvn install
	touch $@

clean:
	rm -rf target .built
.PHONY: clean
