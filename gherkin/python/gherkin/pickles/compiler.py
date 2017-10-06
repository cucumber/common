import re

from ..count_symbols import count_symbols


def compile(gherkin_document):
    pickles = []
    if 'feature' not in gherkin_document:
        return pickles

    feature = gherkin_document['feature']
    feature_tags = feature['tags']
    language = feature['language']
    background_steps = []
    for scenario_definition in feature['children']:
        args = (feature_tags, background_steps, scenario_definition, language, pickles)
        if scenario_definition['type'] is 'Background':
            background_steps = _pickle_steps(scenario_definition)
        elif scenario_definition['type'] is 'Scenario':
            _compile_scenario(*args)
        else:
            _compile_scenario_outline(*args)
    return pickles


def _compile_scenario(feature_tags, background_steps, scenario, language, pickles):
    steps = list()
    if len(scenario['steps']) > 0:
        steps.extend(background_steps)

    tags = list(feature_tags) + list(scenario['tags'])

    for step in scenario['steps']:
        steps.append(_pickle_step(step))

    pickle = {
        'tags': _pickle_tags(tags),
        'name': scenario['name'],
        'language': language,
        'locations': [_pickle_location(scenario['location'])],
        'steps': steps
    }
    pickles.append(pickle)


def _compile_scenario_outline(feature_tags, background_steps, scenario_outline, language, pickles):
    for examples in (e for e in scenario_outline['examples'] if 'tableHeader' in e):
        variable_cells = examples['tableHeader']['cells']

        for values in examples['tableBody']:
            value_cells = values['cells']
            steps = list()
            if len(scenario_outline['steps']) > 0:
                steps.extend(background_steps)
            tags = list(feature_tags) \
                + list(scenario_outline['tags']) \
                + list(examples['tags'])

            for scenario_outline_step in scenario_outline['steps']:
                step_text = _interpolate(
                    scenario_outline_step['text'],
                    variable_cells,
                    value_cells)
                arguments = _create_pickle_arguments(
                    scenario_outline_step.get('argument'),
                    variable_cells,
                    value_cells)
                _pickle_step = {
                    'text': step_text,
                    'arguments': arguments,
                    'locations': [
                        _pickle_location(values['location']),
                        _pickle_step_location(scenario_outline_step)
                    ]
                }
                steps.append(_pickle_step)

            pickle = {
                'name': _interpolate(
                    scenario_outline['name'],
                    variable_cells,
                    value_cells),
                'language': language,
                'steps': steps,
                'tags': _pickle_tags(tags),
                'locations': [
                    _pickle_location(values['location']),
                    _pickle_location(scenario_outline['location'])
                ]
            }
            pickles.append(pickle)


def _create_pickle_arguments(argument, variables, values):
    result = []

    if not argument:
        return result

    if argument['type'] is 'DataTable':
        table = {'rows': []}
        for row in argument['rows']:
            cells = [
                {
                    'location': _pickle_location(cell['location']),
                    'value': _interpolate(cell['value'], variables, values)
                } for cell in row['cells']
            ]
            table['rows'].append({'cells': cells})
        result.append(table)

    elif argument['type'] is 'DocString':
        docstring = {
            'location': _pickle_location(argument['location']),
            'content': _interpolate(argument['content'], variables, values)
        }
        result.append(docstring)

    else:
        raise Exception('Internal error')

    return result


def _interpolate(name, variable_cells, value_cells):
    for n, variable_cell in enumerate(variable_cells):
        value_cell = value_cells[n]
        name = re.sub(
            u'<{0[value]}>'.format(variable_cell),
            value_cell['value'],
            name
            )
    return name


def _pickle_steps(scenario_definition):
    return [_pickle_step(step)
            for step in scenario_definition['steps']]


def _pickle_step(step):
    return {
        'text': step['text'],
        'arguments': _create_pickle_arguments(
            step.get('argument'),
            [],
            []),
        'locations': [_pickle_step_location(step)]
    }


def _pickle_step_location(step):
    return {
        'line': step['location']['line'],
        'column': step['location']['column'] + count_symbols(step.get('keyword', 0))
    }


def _pickle_location(location):
    return {
        'line': location['line'],
        'column': location['column']
    }


def _pickle_tags(tags):
    return [_pickle_tag(tag) for tag in tags]


def _pickle_tag(tag):
    return {
        'name': tag['name'],
        'location': _pickle_location(tag['location'])
    }
