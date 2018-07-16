include default.mk

.deps:
	./scripts/s3-download dots-formatter-go $(LIBRARY_VERSION)
	touch $@

clean: clean-custom

clean-custom:
	rm -rf dots-formatter-go
.PHONY: clean-custom