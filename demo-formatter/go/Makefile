include default.mk

FORMATTER = dist/cucumber-demo-formatter-$(OS)-$(ARCH)

.tested: .tested.diff

.tested.diff: ../../compatibility-kit/javascript/features/examples-tables/examples-tables.feature.ndjson $(FORMATTER) $(GO_SOURCE_FILES)
	cat $< | \
	$(FORMATTER) | diff -u <(printf "😃😃😃😃😃😃😃😃💣😃😃💣😃🤷🥶😃😃🤷\n") -
	touch $@
