Development of This Package
===============================================================================


Bootstrap the Development Environment (Workspace)
-------------------------------------------------------------------------------

Development should use a virtual environment to ensure that only needed
python packages are installed.

ASSUMPTIONS:

* Python >= 2.7 is installed
* pip is installed (should be bundled with python nowadays)
* virtualenv is installed (or use: "python3 -mvenv ..." for Python 3.x)

Check if ``python`` and ``pip`` is installed::

    python --version
    pip --version
    virtualenv --version

If virtualenv is not installed, install it (CASE: UNIX in bash shell)::

    $ sudo pip install virtualenv
    # -- NOTE: "sudo" is normally required on these platforms.

If virtualenv is not installed, install it (CASE: Windows in cmd shell)::

    cmd> pip install virtualenv

Create a virtual environment under UNIX in a bash shell (or similar),
activate the environment and install all required python packages::

    $ virtualenv .venv
    $ source .venv/bin/activate
    $ pip install -r py.requirements/all.txt

Create a virtual environment under Windows in a cmd shell,
activate the environment and install all required python packages::

    cmd> virtualenv .venv
    cmd> source .venv/Scripts/activate
    cmd> pip install -r py.requirements/all.txt

NOTE: The following steps assume that the virtual environment is setup and activated.

SEE ALSO:
* https://pip.pypa.io/en/stable/installing/
* https://packaging.python.org/guides/tool-recommendations/


Running the Tests
-------------------------------------------------------------------------------

::

    pytest          # Run tests in terse mode.
    pytest -v       # Run tests in verbose mode.
    pytest --html=report.html   # Run tests and create HTML test report.

SEE ALSO:

* https://pytest.org/
* https://pypi.python.org/pypi/pytest-html


Running the Tests with tox
-------------------------------------------------------------------------------

Tox allows to run tests against different python versions in isolated
virtual environments, one for each version.

To run the tests, use::

    tox -e py27     # Run tests in a virtual environment with python2.7
    tox -e py37     # Run tests in a virtual environment with python3.7

SEE ALSO:

* https://tox.readthedocs.io/
* https://pypi.python.org/pypi/tox


Create a Test Coverage Report
-------------------------------------------------------------------------------

To create a test coverage report, use::

    invoke test.coverage    # Run tests and create test coverage report.
    tox -e coverage         # Alternative.

NOTE: A HTML report is created under `build/coverage.html/index.html`_.


Use Static Code Analyzers to detect Problems
-------------------------------------------------------------------------------

Perform checks with the following commands::

    pylint cucumber_tag_expressions/     # Run pylint checks.
    bandit cucumber_tag_expressions/     # Run bandit security checks.

ALTERNATIVE: Run tools in a tox environment::

    tox -e pylint         # Run pylint checks.
    tox -e bandit         # Run bandit security checks.

SEE ALSO:

* https://pypi.python.org/pypi/pylint
* https://pypi.python.org/pypi/bandit
* https://pylint.readthedocs.io/
* https://pypi.python.org/pypi/prospector


Cleanup the Workspace
-------------------------------------------------------------------------------

To cleanup the local workspace and development environment, use::

    invoke cleanup        # Cleanup common temporary files.
    invoke cleanup.all    # Cleanup everything (.venv, .tox, ...)
