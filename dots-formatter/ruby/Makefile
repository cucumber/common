include default.mk

.deps:
	./scripts/s3-download dots-formatter-go $(LIBRARY_VERSION)
	touch $@

clean:
	rm -rf dots-formatter-go
