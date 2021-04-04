import re

from ..count_symbols import count_symbols
from ..stream.id_generator import IdGenerator


class Compiler(object):
    def __init__(self, id_generator=None):
        self.id_generator = id_generator
        if self.id_generator is None:
            self.id_generator = IdGenerator()

    def compile(self, gherkin_document):
        pickles = []
        if 'feature' not in gherkin_document:
            return pickles

        feature = gherkin_document['feature']
        if not feature['children']:
            return pickles

        uri = gherkin_document['uri']
        feature_tags = feature['tags']
        language = feature['language']
        background_steps = []
        for scenario_definition in feature['children']:
            if 'background' in scenario_definition:
                if scenario_definition['background']['steps']:
                    background_steps += scenario_definition['background']['steps']
            elif 'rule' in scenario_definition:
                self._compile_rule(uri, feature_tags, background_steps, scenario_definition['rule'], language, pickles)
            else:
                scenario = scenario_definition['scenario']
                args = (uri, feature_tags, background_steps, scenario, language, pickles)
                if not scenario['examples']:
                    self._compile_scenario(*args)
                else:
                    self._compile_scenario_outline(*args)
        return pickles

    def _compile_rule(self, uri, feature_tags, feature_background_steps, rule, language, pickles):
        tags = list(feature_tags) + list(rule['tags'])
        background_steps = []
        background_steps += feature_background_steps
        for scenario_definition in rule['children']:
            if 'background' in scenario_definition:
                if scenario_definition['background']['steps']:
                    background_steps += scenario_definition['background']['steps']
            else:
                scenario = scenario_definition['scenario']
                args = (uri, tags, background_steps, scenario, language, pickles)
                if not scenario['examples']:
                    self._compile_scenario(*args)
                else:
                    self._compile_scenario_outline(*args)
        return pickles

    def _compile_scenario(self, uri, inherited_tags, background_steps, scenario, language, pickles):
        tags = list(inherited_tags) + list(scenario['tags'])
        steps = list()
        if scenario['steps']:
            steps.extend(self._pickle_steps(background_steps + scenario['steps']))

        pickle = {
            'astNodeIds': [scenario['id']],
            'id': self.id_generator.get_next_id(),
            'tags': self._pickle_tags(tags),
            'name': scenario['name'],
            'language': language,
            'steps': steps,
            'uri': uri
        }
        pickles.append(pickle)


    def _compile_scenario_outline(self, uri, inherited_tags, background_steps, scenario, language, pickles):
        for examples in (e for e in scenario['examples'] if 'tableHeader' in e):
            variable_cells = examples['tableHeader']['cells']

            for values in examples['tableBody']:
                value_cells = values['cells']
                steps = list()
                if scenario['steps']:
                    steps.extend(self._pickle_steps(background_steps))
                tags = list(inherited_tags) + list(scenario['tags']) + list(examples['tags'])

                if scenario['steps']:
                    for outline_step in scenario['steps']:
                        step_text = self._interpolate(
                            outline_step['text'],
                            variable_cells,
                            value_cells)
                        argument = self._create_pickle_arguments(
                            outline_step,
                            variable_cells,
                            value_cells)
                        _pickle_step = {
                            'astNodeIds': [outline_step['id'], values['id']],
                            'id': self.id_generator.get_next_id(),
                            'text': step_text,
                            'argument': argument
                        }
                        steps.append(_pickle_step)

                pickle = {
                    'astNodeIds': [scenario['id'], values['id']],
                    'id': self.id_generator.get_next_id(),
                    'name': self._interpolate(
                        scenario['name'],
                        variable_cells,
                        value_cells),
                    'language': language,
                    'steps': steps,
                    'tags': self._pickle_tags(tags),
                    'uri': uri
                }
                pickles.append(pickle)

    def _create_pickle_arguments(self, step, variables, values):
        if 'dataTable' in step:
            table = {'rows': []}
            for row in step['dataTable']['rows']:
                cells = [
                    {
                        'value': self._interpolate(cell['value'], variables, values)
                    } for cell in row['cells']
                ]
                table['rows'].append({'cells': cells})
            return {'dataTable': table}

        elif 'docString' in step:
            argument = step['docString']
            docstring = {
                'content': self._interpolate(argument['content'], variables, values)
            }
            if 'mediaType' in argument:
                docstring['mediaType'] = self._interpolate(argument['mediaType'], variables, values)
            return {'docString': docstring}
        else:
            return {}

    def _interpolate(self, name, variable_cells, value_cells):
        if name is None:
            return name

        for n, variable_cell in enumerate(variable_cells):
            value_cell = value_cells[n]
            name = re.sub(
                u'<{0[value]}>'.format(variable_cell),
                value_cell['value'],
                name
            )
        return name

    def _pickle_steps(self, steps):
        return [self._pickle_step(step)for step in steps]

    def _pickle_step(self, step):
        return {
            'astNodeIds': [step['id']],
            'id': self.id_generator.get_next_id(),
            'text': step['text'],
            'argument': self._create_pickle_arguments(
                step,
                [],
                [])
        }


    def _pickle_tags(self, tags):
        return [self._pickle_tag(tag) for tag in tags]


    def _pickle_tag(self, tag):
        return {
            'astNodeId': tag['id'],
            'name': tag['name']
        }
