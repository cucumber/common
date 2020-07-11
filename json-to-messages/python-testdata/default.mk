# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))
IS_TESTDATA = $(findstring -testdata,${CURDIR})
SETUP_PY = $(shell find . -name "setup.py")

update-dependencies:
	@echo "\033[0;31mPlease update dependencies for python manually!!\033[0m"
.PHONY: update-dependencies

pre-release: update-version update-dependencies clean default
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
ifneq (,$(SETUP_PY))
	sed -i \
		-e "s/\(version *= *\"\)[0-9]*\.[0-9]*\.[0-9]*\(\"\)/\1$(NEW_VERSION)\2/" \
		"setup.py"
endif
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish:
ifeq ($(IS_TESTDATA),-testdata)
	# no-op
else
	python2 setup.py sdist
	python2 -m twine upload dist/*
endif
.PHONY: publish

post-release:
	@echo "No post-release needed for python"
.PHONY: post-release
