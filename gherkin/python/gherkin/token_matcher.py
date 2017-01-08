import re
from .dialect import Dialect
from .errors import NoSuchLanguageException


class TokenMatcher(object):
    LANGUAGE_RE = re.compile(r"^\s*#\s*language\s*:\s*([a-zA-Z\-_]+)\s*$")

    def __init__(self, dialect_name='en'):
        self._default_dialect_name = dialect_name
        self._change_dialect(dialect_name)
        self.reset()

    def reset(self):
        if self.dialect_name != self._default_dialect_name:
            self._change_dialect(self._default_dialect_name)
        self._indent_to_remove = 0
        self._active_doc_string_separator = None

    def match_FeatureLine(self, token):
        return self._match_title_line(token, 'FeatureLine', self.dialect.feature_keywords)

    def match_ScenarioLine(self, token):
        return self._match_title_line(token, 'ScenarioLine', self.dialect.scenario_keywords)

    def match_ScenarioOutlineLine(self, token):
        return self._match_title_line(token, 'ScenarioOutlineLine',
                                      self.dialect.scenario_outline_keywords)

    def match_BackgroundLine(self, token):
        return self._match_title_line(token, 'BackgroundLine', self.dialect.background_keywords)

    def match_ExamplesLine(self, token):
        return self._match_title_line(token, 'ExamplesLine', self.dialect.examples_keywords)

    def match_TableRow(self, token):
        if not token.line.startswith('|'):
            return False
        # TODO: indent
        self._set_token_matched(token, 'TableRow', items=token.line.table_cells)
        return True

    def match_StepLine(self, token):
        keywords = (self.dialect.given_keywords +
                    self.dialect.when_keywords +
                    self.dialect.then_keywords +
                    self.dialect.and_keywords +
                    self.dialect.but_keywords)
        for keyword in (k for k in keywords if token.line.startswith(k)):
            title = token.line.get_rest_trimmed(len(keyword))
            self._set_token_matched(token, 'StepLine', title, keyword)
            return True

        return False

    def match_Comment(self, token):
        if not token.line.startswith('#'):
            return False

        text = token.line._line_text  # take the entire line, including leading space
        self._set_token_matched(token, 'Comment', text, indent=0)
        return True

    def match_Empty(self, token):
        if not token.line.is_empty():
            return False

        self._set_token_matched(token, 'Empty', indent=0)
        return True

    def match_Language(self, token):
        match = self.LANGUAGE_RE.match(token.line.get_line_text())
        if not match:
            return False

        dialect_name = match.group(1)
        self._set_token_matched(token, 'Language', dialect_name)
        self._change_dialect(dialect_name, token.location)
        return True

    def match_TagLine(self, token):
        if not token.line.startswith('@'):
            return False

        self._set_token_matched(token, 'TagLine', items=token.line.tags)
        return True

    def match_DocStringSeparator(self, token):
        if not self._active_doc_string_separator:
            # open
            return (self._match_DocStringSeparator(token, '"""', True) or
                    self._match_DocStringSeparator(token, '```', True))
        else:
            # close
            return self._match_DocStringSeparator(token, self._active_doc_string_separator, False)

    def _match_DocStringSeparator(self, token, separator, is_open):
        if not token.line.startswith(separator):
            return False

        content_type = None
        if is_open:
            content_type = token.line.get_rest_trimmed(len(separator))
            self._active_doc_string_separator = separator
            self._indent_to_remove = token.line.indent
        else:
            self._active_doc_string_separator = None
            self._indent_to_remove = 0

        # TODO: Use the separator as keyword. That's needed for pretty printing.
        self._set_token_matched(token, 'DocStringSeparator', content_type)
        return True

    def match_Other(self, token):
        # take the entire line, except removing DocString indents
        text = token.line.get_line_text(self._indent_to_remove)
        self._set_token_matched(token, 'Other', self._unescaped_docstring(text), indent=0)
        return True

    def match_EOF(self, token):
        if not token.eof():
            return False

        self._set_token_matched(token, 'EOF')
        return True

    def _match_title_line(self, token, token_type, keywords):
        for keyword in (k for k in keywords if token.line.startswith_title_keyword(k)):
            title = token.line.get_rest_trimmed(len(keyword) + len(':'))
            self._set_token_matched(token, token_type, title, keyword)
            return True

        return False

    def _set_token_matched(self, token, matched_type, text=None,
                           keyword=None, indent=None, items=None):
        if items is None:
            items = []
        token.matched_type = matched_type
        # text == '' should not result in None
        token.matched_text = text.rstrip('\r\n') if text is not None else None
        token.matched_keyword = keyword
        if indent is not None:
            token.matched_indent = indent
        else:
            token.matched_indent = token.line.indent if token.line else 0
        token.matched_items = items
        token.location['column'] = token.matched_indent + 1
        token.matched_gherkin_dialect = self.dialect_name

    def _change_dialect(self, dialect_name, location=None):
        dialect = Dialect.for_name(dialect_name)
        if not dialect:
            raise NoSuchLanguageException(dialect_name, location)

        self.dialect_name = dialect_name
        self.dialect = dialect

    def _unescaped_docstring(self, text):
        return text.replace('\\"\\"\\"', '"""') if self._active_doc_string_separator else text
