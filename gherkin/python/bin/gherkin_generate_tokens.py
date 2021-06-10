import codecs
import os
import sys
if sys.version_info < (3, 0):
    import codecs
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
from gherkin.token_scanner import TokenScanner
from gherkin.token_formatter_builder import TokenFormatterBuilder
from gherkin.parser import Parser

files = sys.argv[1:]
if sys.version_info < (3, 0) and os.name != 'nt':  # for Python2 unless on Windows native
    UTF8Writer = codecs.getwriter('utf8')
    sys.stdout = UTF8Writer(sys.stdout)
parser = Parser(TokenFormatterBuilder())
for file in files:
    scanner = TokenScanner(file)
    print(parser.parse(scanner))
