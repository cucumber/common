import io
import os
import sys
from .token import Token
from .gherkin_line import GherkinLine


class TokenScanner(object):
    """
    The scanner reads a gherkin doc (typically read from a `.feature` file) and creates a token for
    each line.

    The tokens are passed to the parser, which outputs an AST (Abstract Syntax Tree).

    If the scanner sees a `#` language header, it will reconfigure itself dynamically to look for
    Gherkin keywords for the associated language. The keywords are defined in
    :file:`gherkin-languages.json`.
    """

    def __init__(self, path_or_str):
        if os.path.exists(path_or_str):
            self.io = io.open(path_or_str, 'rU', encoding='utf8')
        else:
            if sys.version_info < (3, 0):
                if isinstance(path_or_str, str):
                    self.io = io.StringIO(unicode(path_or_str, encoding='utf8'))
                else:
                    self.io = io.StringIO(path_or_str)
            else:
                self.io = io.StringIO(path_or_str)
        self.line_number = 0

    def read(self):
        self.line_number += 1
        location = {'line': self.line_number, 'column': 0}
        line = self.io.readline()
        return Token((GherkinLine(line, self.line_number) if line else line), location)

    def __del__(self):
        # close file descriptor if it's still open
        try:
            self.io.close()
        except AttributeError:
            pass
