update-dependencies:
	@echo "\033[0;31mPlease update dependencies for python manually!!\033[0m"
.PHONY: update-dependencies

update-version:
ifdef NEW_VERSION
	sed -i \
		-e "s/\(version *= *\"\)[0-9]*\.[0-9]*\.[0-9]*\(\"\)/\1$(NEW_VERSION)\2/" \
		"setup.py"
else
	@echo -e "\033[0;NEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif

publish:
	python setup.py sdist
	python -m twine upload --repository-url https://test.pypi.org/legacy/ dist/*
.PHONY: publish
