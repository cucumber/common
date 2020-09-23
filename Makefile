SHELL := /usr/bin/env bash
PACKAGES ?= c21e \
	messages \
	gherkin \
	gherkin-utils \
	cucumber-expressions \
	tag-expressions \
	create-meta \
	fake-cucumber \
	query \
	json-formatter \
	compatibility-kit \
	react \
	html-formatter \
	datatable \
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
	docker pull cucumber/cucumber-build:latest
	docker run \
	  --publish "6006:6006" \
	  --volume "${shell pwd}":/app \
	  --volume "${HOME}/.m2/repository":/home/cukebot/.m2/repository \
	  --volume "${HOME}/.gitconfig":/home/cukebot/.gitconfig \
	  --user 1000 \
	  --rm \
	  -it cucumber/cucumber-build:latest \
	  bash
.PHONY:

docker-run-with-secrets:
	[ -d '../secrets' ] || git clone keybase://team/cucumberbdd/secrets ../secrets
	git -C ../secrets pull
	../secrets/update_permissions
	docker pull cucumber/cucumber-build:latest
	docker run \
	  --publish "6006:6006" \
	  --volume "${shell pwd}":/app \
	  --volume "${shell pwd}/../secrets/import-gpg-key.sh":/home/cukebot/import-gpg-key.sh \
	  --volume "${shell pwd}/../secrets/codesigning.key":/home/cukebot/codesigning.key \
	  --volume "${shell pwd}/../secrets/.ssh":/home/cukebot/.ssh \
	  --volume "${shell pwd}/../secrets/.gem":/home/cukebot/.gem \
	  --volume "${shell pwd}/../secrets/.npmrc":/home/cukebot/.npmrc \
	  --volume "${HOME}/.m2/repository":/home/cukebot/.m2/repository \
	  --volume "${HOME}/.gitconfig":/home/cukebot/.gitconfig \
	  --env-file ../secrets/secrets.list \
	  --user 1000 \
	  --rm \
	  -it cucumber/cucumber-build:latest \
	  bash
