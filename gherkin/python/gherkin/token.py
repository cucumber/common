class Token(object):
    def __init__(self, gherkin_line, location):
        self.line = gherkin_line
        self.location = location

    def eof(self):
        return not self.line

    def detach(self):
        pass  # TODO: detach line - is this needed?

    def token_value(self):
        return "EOF" if self.eof() else self.line.get_line_text()
