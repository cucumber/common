include default.mk

.tested: .tested.diff

.tested.diff: bin/cucumber-demo-formatter $(RUBY_SOURCE_FILES)
	cat ../../compatibility-kit/javascript/features/examples-tables/examples-tables.ndjson | \
	bundle exec bin/cucumber-demo-formatter --format ndjson | diff -u <(printf "😃😃😃😃😃😃😃😃💣😃😃💣😃🤷🥶😃😃🤷\n") -
	touch $@
