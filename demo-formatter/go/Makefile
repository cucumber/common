include default.mk

FORMATTER = dist/cucumber-demo-formatter-$(OS)-$(ARCH)

.tested.diff: ../../compatibility-kit/javascript/features/examples-tables/examples-tables.ndjson $(FORMATTER) $(GO_SOURCE_FILES)
	cat $< | \
	$(FORMATTER) --format ndjson | diff -u <(printf "😃😃😃😃😃😃😃😃💣😃😃💣😃🤷🥶😃😃🤷\n") -
	touch $@
