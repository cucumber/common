from gherkin.ast_builder import AstBuilder
from gherkin.parser import Parser
from gherkin.pickles.compiler import Compiler
from gherkin.errors import ParserError, CompositeParserException
from gherkin.stream.id_generator import IdGenerator

def create_errors(errors, uri):
    for error in errors:
        yield {
            'parseError': {
            'source': {
                'uri': uri,
                'location': error.location
            },
            'message': str(error),
        }}


class GherkinEvents:
    def __init__(self, options):
        self.options = options
        self.id_generator = IdGenerator()
        self.parser = Parser(ast_builder=AstBuilder(self.id_generator))
        self.compiler = Compiler(self.id_generator)

    def enum(self, source_event):
        uri = source_event['source']['uri']
        source = source_event['source']['data']

        try:
            gherkin_document = self.parser.parse(source)
            gherkin_document['uri'] = uri

            if (self.options.print_source):
                yield source_event

            if (self.options.print_ast):
                yield {
                    'gherkinDocument': gherkin_document
                }

            if (self.options.print_pickles):
                pickles = self.compiler.compile(gherkin_document)
                for pickle in pickles:
                    yield {
                        'pickle': pickle
                    }
        except CompositeParserException as e:
            for event in create_errors(e.errors, uri):
                yield event
        except ParserError as e:
            for event in create_errors([e], uri):
                yield event
