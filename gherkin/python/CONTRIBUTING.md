Please read [CONTRIBUTING](https://github.com/cucumber/gherkin/blob/master/CONTRIBUTING.md) first.
You should clone the [cucumber/gherkin](https://github.com/cucumber/gherkin) repo if you want
to contribute.

## Basic style guide

Use [pep8](https://pypi.python.org/pypi/pep8) check the Python code style.
Use the command:

    pep8 --max-line-length=99

The exception is [parser.py](https://github.com/cucumber/gherkin/blob/master/python/gherkin/parser.py), as it is generated longer lines are allowed there, so to check it use:

    pep8 --ignore=E501

## Run tests

### Using make

Just run `make` from this directory.

### Using nosetests

Just run `nosetests` from this directory (you need to `pip install -r requirements.txt` first).

Keep in mind that this will only run unit tests. The acceptance tests are only
run when you build with `make`.

## Make a release

This is based on [How to submit a package to PyPI](http://peterdowns.com/posts/first-time-with-pypi.html)

    # Change `version` and `download_url` in `setup.py`
    # Replace X.Y.Z with the version

    python setup.py sdist upload -r pypi
    git add .
    git commit -m "Release X.Y.Z"
    git tag -a -m "Version X.Y.Z" vX.Y.Z
    git push
    git push --tags
