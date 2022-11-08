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
        last_keyword_type = 'Unknown'
        steps = list()
        if scenario['steps']:
            for step in background_steps + scenario['steps']:
                last_keyword_type = last_keyword_type if step['keywordType'] == 'Conjunction' else step['keywordType']
                steps.append(self._pickle_step(step, last_keyword_type))

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
                tags = list(inherited_tags) + list(scenario['tags']) + list(examples['tags'])
                last_keyword_type = None
                steps = list()
                if scenario['steps']:
                    for step in background_steps:
                        last_keyword_type = last_keyword_type if step['keywordType'] == 'Conjunction' else step['keywordType']
                        steps.append(self._pickle_step(step, last_keyword_type))

                if scenario['steps']:
                    for outline_step in scenario['steps']:
                        last_keyword_type = last_keyword_type if outline_step['keywordType'] == 'Conjunction' else outline_step['keywordType']
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
                            'type': last_keyword_type,
                            'text': step_text
                        }
                        if argument is not None:
                            _pickle_step['argument'] = argument

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
            return None

    def _interpolate(self, name, variable_cells, value_cells):
        if name is None:
            return name

        for n, variable_cell in enumerate(variable_cells):
            value_cell = value_cells[n]
            # For the case of trailing backslash, re-escaping backslashes are needed
            reescaped_value = re.sub(r'\\', r'\\\\', value_cell['value'])
            name = re.sub(
                u'<{0[value]}>'.format(variable_cell),
                reescaped_value,
                name
            )
        return name

    def _pickle_step(self, step, keyword_type):
        pickle_step = {
            'astNodeIds': [step['id']],
            'id': self.id_generator.get_next_id(),
            'type': keyword_type,
            'text': step['text'],
        }
        argument = self._create_pickle_arguments(
            step,
            [],
            [])
        if argument is not None:
            pickle_step['argument'] = argument
        return pickle_step


    def _pickle_tags(self, tags):
        return [self._pickle_tag(tag) for tag in tags]


    def _pickle_tag(self, tag):
        return {
            'astNodeId': tag['id'],
            'name': tag['name']
        }
