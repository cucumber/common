include default.mk

FORMATTER = dist/cucumber-demo-formatter-$(OS)-$(ARCH)

.tested: .tested.diff

.tested.diff: $(FORMATTER) $(GO_SOURCE_FILES)
	cat ../../compatibility-kit/javascript/features/examples-tables/examples-tables.ndjson | \
	$(FORMATTER) --format ndjson | diff -u <(printf "😃😃😃😃😃😃😃😃💣😃😃💣😃🤷🥶😃😃🤷\n") -
	touch $@
