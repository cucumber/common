include default.mk

.tested: .tested.diff

.tested.diff: ../testdata/hello.feature bin/cucumber-demo-formatter $(RUBY_SOURCE_FILES) 
	../../fake-cucumber/javascript/bin/fake-cucumber ../testdata/hello.feature --format ndjson | \
	bundle exec bin/cucumber-demo-formatter --format ndjson | diff -u <(printf "😃💣🥶") -
	touch $@
