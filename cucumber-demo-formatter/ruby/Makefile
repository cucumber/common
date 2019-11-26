include default.mk

.tested: .acceptance_tested

.acceptance_tested: ../testdata/hello.feature bin/cucumber-demo-formatter $(RUBY_SOURCE_FILES)
	../../fake-cucumber/javascript/bin/fake-cucumber ../testdata/hello.feature --format ndjson | \
	bundle exec bin/cucumber-demo-formatter --format ndjson | diff -u <(printf "😃💣🥶") -
	touch $@

clean:
	rm -f .acceptance_tested