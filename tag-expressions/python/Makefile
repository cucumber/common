# =============================================================================
# GNU MAKEFILE: cucumber-tag-expressions for Python
# =============================================================================
# NOTE: bootstrap requires ON-LINE access.
# REQUIRES: Python >= 2.7 is installed
# REQUIRES: pip is installed (normally w/ newer python versions)
# DESCRIPTION:
#    This makefile uses "pipenv" to automatically setup a virtual environment
#    (for Python) in the HOME directory of the user (for this directory).
#
# SEE ALSO:
#  * https://pypi.python.org/pypi/pipenv/
#  * https://docs.pipenv.org
#  * https://github.com/pypa/pipenv
# =============================================================================

.PHONY: clean clean-all default test test.coverage tox

BOOTSTRAP_DONE_MARKER_FILE := build/.bootstrap.DONE
BOOTSTRAP_DONE_MARKER_DIR  := $(dir $(BOOTSTRAP_DONE_MARKER_FILE))
PIPENV_OPTIONS :=

all: default
default: bootstrap test

bootstrap: $(BOOTSTRAP_DONE_MARKER_FILE)
_bootstrap $(BOOTSTRAP_DONE_MARKER_FILE):
	@echo "bootstrap: Python environment ..."
	test -d $(BOOTSTRAP_DONE_MARKER_DIR) || mkdir -p $(BOOTSTRAP_DONE_MARKER_DIR)
	pip install --user pipenv
	pipenv $(PIPENV_OPTIONS) install -r py.requirements/basic.txt
	pipenv install -r py.requirements/testing.txt
	pipenv install -r tasks/py.requirements.txt
	touch $(BOOTSTRAP_DONE_MARKER_FILE)

clean:
	-rm -f $(BOOTSTRAP_DONE_MARKER_FILE)
	-rm -rf build
	-rm -rf .tox
	-rm -rf .venv*
	-py.cleanup
	-pipenv --rm

test: $(BOOTSTRAP_DONE_MARKER_FILE)
	pipenv run pytest $(PYTEST_ARGS)

test.coverage: $(BOOTSTRAP_DONE_MARKER_FILE)
	pipenv run invoke test.coverage

tox: $(BOOTSTRAP_DONE_MARKER_FILE)
	pipenv run tox $(TOX_ARGS)
