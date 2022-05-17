import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
from gherkin.token_scanner import TokenScanner
from gherkin.token_formatter_builder import TokenFormatterBuilder
from gherkin.parser import Parser

files = sys.argv[1:]
parser = Parser(TokenFormatterBuilder())
for file in files:
    scanner = TokenScanner(file)
    print(parser.parse(scanner))
