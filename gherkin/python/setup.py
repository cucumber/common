# coding: utf-8
from distutils.core import setup

setup(name="gherkin-official",
      packages=["gherkin", "gherkin.pickles", "gherkin.stream"],
      version="23.0.1",
      description="Gherkin parser (official, by Cucumber team)",
      long_description="Gherkin parser (official, by Cucumber team)",
      author="Cucumber Ltd and Björn Rasmusson",
      author_email="cukes@googlegroups.com",
      url="https://github.com/cucumber/gherkin-python",
      license="MIT",
      download_url="http://pypi.python.org/pypi/gherkin-official",
      keywords=["gherkin", "cucumber", "bdd"],
      scripts=["bin/gherkin"],
      classifiers=[
          "Programming Language :: Python",
          "Programming Language :: Python :: 3",
          "Programming Language :: Python :: 3.7",
          "Programming Language :: Python :: 3.8",
          "Programming Language :: Python :: 3.9",
          "Programming Language :: Python :: 3.10",
      ],
      platforms=['any'],
      package_data={"gherkin": ["gherkin-languages.json"]},
      )
