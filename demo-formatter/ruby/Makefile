include default.mk

.tested: .tested.diff

.tested.diff: ../../compatibility-kit/javascript/features/examples-tables/examples-tables.ndjson $(RUBY_SOURCE_FILES)
	cat $< | \
	bundle exec bin/cucumber-demo-formatter --format ndjson | diff -u <(printf "😃😃😃😃😃😃😃😃💣😃😃💣😃🤷🥶😃😃🤷\n") -
	touch $@
