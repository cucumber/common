include default.mk

ifndef CI
# Don't run diffs in CI. ../../fake-cucumber doesn't work there because node_modules symlinks
.tested: .tested.diff
endif

.tested.diff: ../testdata/hello.feature bin/cucumber-demo-formatter $(RUBY_SOURCE_FILES) 
	../../fake-cucumber/javascript/bin/fake-cucumber --globals --format ndjson ../testdata/hello.feature | \
	bundle exec bin/cucumber-demo-formatter --format ndjson | diff -u <(printf "😃💣🥶") -
	touch $@
