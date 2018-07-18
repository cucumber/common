include default.mk

.deps:
	echo "TRAVIS_BRANCH:$(TRAVIS_BRANCH)"
	echo "TRAVIS_TAG:$(TRAVIS_TAG)"
	echo "git branch:$(shell git rev-parse --abbrev-ref HEAD)"
	echo "LIBRARY_VERSION:$(LIBRARY_VERSION)"
	./scripts/s3-download dots-formatter-go $(LIBRARY_VERSION)
	touch $@

clean:
	rm -rf dots-formatter-go
