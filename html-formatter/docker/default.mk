SHELL := /usr/bin/env bash

default: .built
.PHONY: default

.built: Dockerfile
	source ../../scripts/functions.sh && docker_build Dockerfile
	touch $@

update-dependencies:
	sed -E "s/(RUN npm install -g [a-z-]+)@.*/\\1@$(NEW_VERSION)/" Dockerfile > Dockerfile.tmp
	mv Dockerfile.tmp Dockerfile
.PHONY: update-dependencies

pre-release: update-dependencies clean default
.PHONY: pre-release

update-version:
.PHONY: update-version

publish:
	source ../../scripts/functions.sh && docker_push Dockerfile
.PHONY: publish

post-release:
	@echo "No post-release needed for docker"
.PHONY: post-release

clean:
	rm -f .built
.PHONY: clean
