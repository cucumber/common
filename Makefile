SHELL := /usr/bin/env bash
BUILD_IMAGE ?= $(shell grep "image: cucumber/cucumber-build:" .circleci/config.yml | cut -c 16-)
PACKAGES ?= messages \
	message-streams \
	gherkin \
	gherkin-streams \
	gherkin-utils \
	fake-cucumber \
	query \
	json-formatter \
	compatibility-kit \
	react \
	html-formatter \
	config \
	demo-formatter \
	json-to-messages

default: .rsynced $(patsubst %,default-%,$(PACKAGES))
.PHONY: default

default-%: %
	cd $< && make default

update-dependencies: $(patsubst %,update-dependencies-%,$(PACKAGES))
.PHONY: update-dependencies

update-dependencies-%: %
	cd $< && make update-dependencies

clean: $(patsubst %,clean-%,$(PACKAGES))
	rm -f .rsynced
.PHONY: clean

clean-%: %
	cd $< && make clean

ci: push_subrepos check_synced default

check_synced: .rsynced
	[[ -z $$(git status -s) ]] || ( \
		echo "Working copy is dirty. Please run 'source scripts/functions.sh && rsync_files' and commit modified files." && \
		echo "Found: " && \
		git status -s && \
		exit 1 \
	)
.PHONY: check_synced

push_subrepos:
	source scripts/functions.sh && push_subrepos .
.PHONY: push_subrepos

.rsynced:
	source scripts/functions.sh && rsync_files
	touch $@

docker-run:
	[ "${BUILD_IMAGE}" ] || (echo "Build image version could not be read from .circleci/config.yml" && exit 1)
	[ -d "${HOME}/.m2/repository" ] || mkdir -p "${HOME}/.m2/repository"
	docker run \
	  --publish "6006:6006" \
	  --volume "${shell pwd}":/app \
	  --volume "${HOME}/.m2/repository":/home/cukebot/.m2/repository \
	  --rm \
	  --interactive \
	  --tty \
	  ${BUILD_IMAGE} \
	  bash
.PHONY:

docker-run-with-secrets:
	[ -d '../secrets' ] || git clone keybase://team/cucumberbdd/secrets ../secrets
	git -C ../secrets pull
	../secrets/update_permissions
	[ -d "${HOME}/.m2/repository" ] || mkdir -p "${HOME}/.m2/repository"
	docker run \
	  --publish "6006:6006" \
	  --volume "${shell pwd}":/app \
	  --volume "${HOME}/.m2/repository":/home/cukebot/.m2/repository \
	  --volume "${shell pwd}/../secrets/.pause":/home/cukebot/.pause \
	  --volume "${shell pwd}/../secrets/.gem":/home/cukebot/.gem \
	  --volume "${shell pwd}/../secrets/.ssh":/home/cukebot/.ssh \
	  --volume "${shell pwd}/../secrets/.npmrc":/home/cukebot/.npmrc \
	  --volume "${shell pwd}/../secrets/configure":/home/cukebot/configure \
	  --volume "${shell pwd}/../secrets/codesigning.key":/home/cukebot/codesigning.key \
	  --volume "${shell pwd}/../secrets/gpg-with-passphrase":/home/cukebot/gpg-with-passphrase \
	  --env-file ../secrets/secrets.list \
	  --user 1000 \
	  --rm \
	  --interactive \
	  --tty \
	  ${BUILD_IMAGE} \
	  bash
