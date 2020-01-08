include default.mk

FORMATTER = dist/cucumber-demo-formatter-$(OS)-$(ARCH)

ifndef CI
# Don't run diffs in CI. ../../fake-cucumber doesn't work there because node_modules symlinks
.tested: .tested.diff
endif

.tested.diff: ../testdata/hello.feature $(FORMATTER) $(GO_SOURCE_FILES)
	../../fake-cucumber/javascript/bin/fake-cucumber --globals --format ndjson ../testdata/hello.feature | \
	$(FORMATTER) --format ndjson | diff -u <(printf "😃💣🥶\n") -
	touch $@
