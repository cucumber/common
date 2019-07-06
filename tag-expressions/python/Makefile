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

# -----------------------------------------------------------------------------
# PROJECT CONFIGURATION:
# -----------------------------------------------------------------------------
BOOTSTRAP_DONE_MARKER_FILE := build/.bootstrap.DONE
BOOTSTRAP_DONE_MARKER_DIR  := $(dir $(BOOTSTRAP_DONE_MARKER_FILE))
PIPENV := pipenv
PIPENV_RUN := pipenv run
PIPENV_VERSION := 8.3.2
USE_PIPENV := yes
SUDO := sudo

PY_REQUIREMENT_FILES := py.requirements/basic_and_testing.txt
PY_REQUIREMENT_OPTIONAL_FILES := tasks/py.requirements.txt

PYTHONPATH ?= .
export PYTHONPATH

# -----------------------------------------------------------------------------
# MAKE VARIATION LOGIC:
# -----------------------------------------------------------------------------
ifeq ($(CI),true)
  # -- USE: pip (instead of pipenv) in CI environment.
  USE_PIPENV := no
else
ifeq ($(TRAVIS),true)
  USE_PIPENV := no
endif
endif

_PIPENV_RESOLVED = $(shell which pipenv)
ifneq ($(USE_PIPENV),yes)
    PIPENV := pip
    PIPENV_RUN :=
    _PIPENV_RESOLVED := pip
endif

# -----------------------------------------------------------------------------
# MAKE RULES:
# -----------------------------------------------------------------------------
$(info USING: $(PIPENV))

all: default
default: bootstrap test

bootstrap: $(BOOTSTRAP_DONE_MARKER_FILE)
_bootstrap $(BOOTSTRAP_DONE_MARKER_FILE):
	@echo "bootstrap: Python environment ..."
	test -d $(BOOTSTRAP_DONE_MARKER_DIR) || mkdir -p $(BOOTSTRAP_DONE_MARKER_DIR)
ifeq ($(_PIPENV_RESOLVED),)
	@echo "INSTALL-REQUIRED: pipenv"
	$(SUDO) pip install pipenv==$(PIPENV_VERSION)
endif

ifeq ($(CI),true)
	$(SUDO) $(PIPENV) install $(addprefix -r ,$(PY_REQUIREMENT_FILES))
else
	$(PIPENV) install $(addprefix -r ,$(PY_REQUIREMENT_FILES))
endif
	touch $(BOOTSTRAP_DONE_MARKER_FILE)

#	$(PIPENV) install -r py.requirements/testing.txt
#	$(PIPENV) install -r tasks/py.requirements.txt

clean:
	-rm -f $(BOOTSTRAP_DONE_MARKER_FILE)
	-rm -rf build
	-rm -rf .tox
	-rm -rf .venv*
	-py.cleanup
	-pipenv --rm
	-find . -name "*.pyc" | xargs rm -f

test: $(BOOTSTRAP_DONE_MARKER_FILE)
	$(PIPENV_RUN) pytest $(PYTEST_ARGS)

test.coverage: $(BOOTSTRAP_DONE_MARKER_FILE)
	$(PIPENV_RUN) invoke test.coverage

tox: $(BOOTSTRAP_DONE_MARKER_FILE)
	$(PIPENV_RUN) tox $(TOX_ARGS)
