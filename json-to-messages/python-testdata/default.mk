# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))
IS_TESTDATA = $(findstring -testdata,${CURDIR})

update-dependencies:
	@echo "\033[0;31mPlease update dependencies for python manually!!\033[0m"
.PHONY: update-dependencies

pre-release: update-version update-dependencies clean default
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
	sed -i \
		-e "s/\(version *= *\"\)[0-9]*\.[0-9]*\.[0-9]*\(\"\)/\1$(NEW_VERSION)\2/" \
		"setup.py"
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish:
ifeq ($(IS_TESTDATA),-testdata)
	# no-op
else
	python setup.py sdist
	python -m twine upload dist/*
endif
.PHONY: publish

post-release:
	@echo "No post-release needed for python"
.PHONY: post-release
