import io
import os
import json


DIALECT_FILE_PATH = os.path.join(
    os.path.dirname(__file__),
    'gherkin-languages.json')

with io.open(DIALECT_FILE_PATH, 'r', encoding='utf-8') as file:
    DIALECTS = json.load(file)


class Dialect(object):

    @classmethod
    def for_name(cls, name):
        return cls(DIALECTS[name]) if name in DIALECTS else None

    def __init__(self, spec):
        self.spec = spec

    @property
    def feature_keywords(self):
        return self.spec['feature']

    @property
    def rule_keywords(self):
        return self.spec['rule']

    @property
    def scenario_keywords(self):
        return self.spec['scenario']

    @property
    def scenario_outline_keywords(self):
        return self.spec['scenarioOutline']

    @property
    def background_keywords(self):
        return self.spec['background']

    @property
    def examples_keywords(self):
        return self.spec['examples']

    @property
    def given_keywords(self):
        return self.spec['given']

    @property
    def when_keywords(self):
        return self.spec['when']

    @property
    def then_keywords(self):
        return self.spec['then']

    @property
    def and_keywords(self):
        return self.spec['and']

    @property
    def but_keywords(self):
        return self.spec['but']
