#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Setup package for package life-cycle tasks: install, sdist, ...

SEE ALSO:

* https://packaging.python.org

REQUIRES:

* setuptools are installed

RELATED:
  * http://pypi.python.org/pypi/setuptools
"""

import sys
import os.path
from setuptools import setup, find_packages


# -----------------------------------------------------------------------------
# PREPARE SETUP:
# -----------------------------------------------------------------------------
HERE = os.path.dirname(__file__)
python_version = float('%s.%s' % sys.version_info[:2])

README = os.path.join(HERE, "README.rst")
long_description = ''.join(open(README).readlines()[4:])

use_2to3_enabled = False
if python_version >= 3.0:
    use_2to3_enabled = True


# -----------------------------------------------------------------------------
# UTILITY:
# -----------------------------------------------------------------------------
def find_packages_by_root_package(where):
    """
    Better than excluding everything that is not needed,
    collect only what is needed.
    """
    root_package = os.path.basename(where)
    packages = [ "%s.%s" % (root_package, sub_package)
                 for sub_package in find_packages(where)]
    packages.insert(0, root_package)
    return packages


# -----------------------------------------------------------------------------
# SETUP:
# -----------------------------------------------------------------------------
setup(
    name = "cucumber-tag-expressions",
    version = "1.1.2",
    author = "Jens Engel",
    author_email = "jenisys@noreply.github.com",
    url = "https://github.com/cucumber/tag-expressions-python",
    download_url= "http://pypi.python.org/pypi/cucumber-tag-expressions",
    description = "Provides tag-expression parser for cucumber/behave",
    long_description = long_description,
    keywords= "BDD, testing, cucumber, tag-expressions, behave",
    license = "MIT",
    packages = find_packages_by_root_package("cucumber_tag_expressions"),
    include_package_data = True,

    # -- REQUIREMENTS:
    python_requires=">=2.7",
    install_requires=[
        "enum34; python_version < '3.4'"
    ],
    tests_require=[
        "pytest >= 3.2",
        "pytest-html >= 1.19.0",
    ],
    extras_require={
        # PREPARED: 'docs': ["sphinx>=1.5"],
        'develop': [
            "coverage",
            "pytest >= 3.2",
            "pytest-html >= 1.19.0",
            "tox >= 2.9",
            "invoke",
            "path.py",
            "pylint"
        ],
    },

    test_suite = "tests",
    zip_safe = True,

    classifiers = [
        "Development Status :: 4 - Beta",
        "Environment :: Console",
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 2",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.5",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: Implementation :: CPython",
        "Programming Language :: Python :: Implementation :: PyPy",
        "Topic :: Software Development :: Testing",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "License :: OSI Approved :: BSD License",
    ],
    platforms = ['any'],
    use_2to3 = use_2to3_enabled
)
