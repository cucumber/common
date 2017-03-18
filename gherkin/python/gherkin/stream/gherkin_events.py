from gherkin.parser import Parser
from gherkin.pickles.compiler import compile
from gherkin.errors import ParserError, CompositeParserException

def add_errors(events, errors, uri):
    for error in errors:
        events.append({
            'type': 'attachment',
            'source': {
                'uri': uri,
                'start': {
                    'line': error.location['line'],
                    'column': error.location['column']
                }
            },
            'data': str(error),
            'media': {
                'encoding': 'utf-8',
                'type': 'text/vnd.cucumber.stacktrace+plain'
            }
        })

class GherkinEvents:
    def __init__(self, options):
        self.options = options
        self.parser = Parser()

    def enum(self, source_event):
        uri = source_event['uri']
        source = source_event['data']

        events = []

        try:
            gherkin_document = self.parser.parse(source)

            if (self.options.print_source):
                events.append(source_event)

            if (self.options.print_ast):
                events.append({
                    'type': 'gherkin-document',
                    'uri': uri,
                    'document': gherkin_document
                })

            if (self.options.print_pickles):
                pickles = compile(gherkin_document)
                for pickle in pickles:
                    events.append({
                        'type': 'pickle',
                        'uri': uri,
                        'pickle': pickle
                    })
        except CompositeParserException as e:
            add_errors(events, e.errors, uri)
        except ParserError as e:
            add_errors(events, [e], uri)

        return events
