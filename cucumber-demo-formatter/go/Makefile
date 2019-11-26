include default.mk

FORMATTER = dist/cucumber-demo-formatter-$(OS)-$(ARCH)

.tested: .tested.diff

.tested.diff: ../testdata/hello.feature $(FORMATTER) $(GO_SOURCE_FILES) 
	../../fake-cucumber/javascript/bin/fake-cucumber ../testdata/hello.feature --format ndjson | \
	$(FORMATTER) --format ndjson | diff -u <(printf "😃💣🥶") -
	touch $@
