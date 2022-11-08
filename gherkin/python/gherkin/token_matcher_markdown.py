import re
from collections import defaultdict
from .dialect import Dialect
from .errors import NoSuchLanguageException

KEYWORD_PREFIX_BULLET = '^(\\s*[*+-]\\s*)'
KEYWORD_PREFIX_HEADER = '^(#{1,6}\\s)'

class GherkinInMarkdownTokenMatcher(object):
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
        self.matched_feature_line=False

    def match_FeatureLine(self, token):

        if(self.matched_feature_line):
            self._set_token_matched(token,None)

        # We first try to match "# Feature: blah"
        result = self._match_title_line(KEYWORD_PREFIX_HEADER, self.dialect.feature_keywords, ':', token, 'FeatureLine')
        # If we didn't match "# Feature: blah", we still match this line
        # as a FeatureLine.
        # The reason for this is that users may not want to be constrained by having this as their fist line.

        if not result:
            self._set_token_matched(token,'FeatureLine',token.line.get_line_text())
        self.matched_feature_line=result
        return result
        


    def match_RuleLine(self, token):
        return self._match_title_line(KEYWORD_PREFIX_HEADER, self.dialect.rule_keywords, ':', token, 'RuleLine')

    def match_ScenarioLine(self, token):
        return self._match_title_line(KEYWORD_PREFIX_HEADER, self.dialect.scenario_keywords, ':', token, 'ScenarioLine') or self._match_title_line(KEYWORD_PREFIX_HEADER, self.dialect.scenario_outline_keywords, ':', token, 'ScenarioLine')

    def match_BackgroundLine(self, token):
        return self._match_title_line(KEYWORD_PREFIX_HEADER, self.dialect.background_keywords, ':', token, 'BackgroundLine')

    def match_ExamplesLine(self, token):
        return self._match_title_line(KEYWORD_PREFIX_HEADER, self.dialect.examples_keywords, ':', token, 'ExamplesLine')

    def match_TableRow(self, token):
        # Gherkin tables must be indented 2-5 spaces in order to be distinguidedn from non-Gherkin tables

        if re.match('^\\s\\s\\s?\\s?\\s?\\|',token.line.get_line_text(0)):
            table_cells = token.line.table_cells
            if(self._is_gfm_table_separator(table_cells)):
                return False
        
            self._set_token_matched(token, 'TableRow', keyword='|',items=token.line.table_cells)

            return True
        return False

    def _is_gfm_table_separator(self, table_cells):
        text_of_table_cells = map(lambda x: x['text'], table_cells)
        separator_values = list(filter(lambda x: re.match('^:?-+:?$',x),text_of_table_cells))
        return len(separator_values) > 0


    def match_StepLine(self, token):
        nonStarStepKeywords = (self.dialect.given_keywords +
                    self.dialect.when_keywords +
                    self.dialect.then_keywords +
                    self.dialect.and_keywords +
                    self.dialect.but_keywords)
        return self._match_title_line(KEYWORD_PREFIX_BULLET, nonStarStepKeywords, '', token, 'StepLine')
        
    def match_Comment(self, token):
        if(token.line.startswith('|')):
            table_cells = token.line.table_cells
            if(self._is_gfm_table_separator(table_cells)):
                return True
        return self._set_token_matched(token,None,False)

    def match_Empty(self, token):

        result = False
        if token.line.is_empty():
            result = True
        if ( not self.match_TagLine(token) and 
             not self.match_FeatureLine(token) and
             not self.match_ScenarioLine(token) and
             not self.match_BackgroundLine(token) and
             not self.match_ExamplesLine(token) and
             not self.match_RuleLine(token) and
             not self.match_TableRow(token) and
             not self.match_Comment(token) and
             not self.match_Language(token) and
             not self.match_DocStringSeparator(token) and
             not self.match_EOF(token) and
             not self.match_StepLine(token)
           ):
            # neutered
            result = True

        if(result):
            self._set_token_matched(token, 'Empty', indent=0)
            return result
        return False

    # We've made a deliberate choice not to support `# language: [ISO 639-1]` headers or similar
    # in Markdown. Users should specify a language globally. 
    def match_Language(self, token):
        if not token:
            raise ValueError('no token')
        return False

    def match_TagLine(self, token):

        tags = []
        matching_tags = re.finditer('`(@[^`]+)`', token.line.get_line_text())
        idx=0
        for match in matching_tags:
            tags.append({
                'column': token.line.indent + match.start(idx) + 2,
                'text': match.group(1)
            })

        if(len(tags) == 0):
            return False

        self._set_token_matched(token, 'TagLine', items=tags)
        return True

    def match_DocStringSeparator(self, token):
        if not self._active_doc_string_separator:
            # open
            return (self._match_DocStringSeparator(token, '"""', True) or
                    self._match_DocStringSeparator(token, '````', True) or self._match_DocStringSeparator(token, '```', True))
        else:
            # close
            return self._match_DocStringSeparator(token, self._active_doc_string_separator, False)

    def _match_DocStringSeparator(self, token, separator, is_open):
        if not token.line.startswith(separator):
            return False

        content_type = ''
        if is_open:
            content_type = token.line.get_rest_trimmed(len(separator))
            self._active_doc_string_separator = separator
            self._indent_to_remove = token.line.indent
        else:
            self._active_doc_string_separator = None
            self._indent_to_remove = 0

        # TODO: Use the separator as keyword. That's needed for pretty printing.
        self._set_token_matched(token, 'DocStringSeparator', content_type, separator)
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

    def _match_title_line(self, prefix, keywords, keywordSuffix, token, token_type):
        
        keywords_or_list="|".join(map(lambda x: re.escape(x), keywords))
        match = re.search(u'{}({}){}(.*)'.format(prefix, keywords_or_list, keywordSuffix), token.line.get_line_text())
        indent = token.line.indent
        result = False
        
        if(match):
            matchedKeyword = match.group(2)
            indent += len(match.group(1))
            self._set_token_matched(token, token_type, match.group(3).strip(), matchedKeyword, indent=indent)
            return True
        return False

    def _set_token_matched(self, token, matched_type, text=None,
                           keyword=None, keyword_type=None, indent=None, items=None):
        if items is None:
            items = []
        token.matched_type = matched_type
        # text == '' should not result in None
        token.matched_text = text.rstrip('\r\n') if text is not None else None
        token.matched_keyword = keyword
        token.matched_keyword_type = keyword_type
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
        self.keyword_types = defaultdict(list)
        for keyword in self.dialect.given_keywords:
            self.keyword_types[keyword].append('Context')
        for keyword in self.dialect.when_keywords:
            self.keyword_types[keyword].append('Action')
        for keyword in self.dialect.then_keywords:
            self.keyword_types[keyword].append('Outcome')
        for keyword in self.dialect.and_keywords + self.dialect.but_keywords:
            self.keyword_types[keyword].append('Conjunction')

    def _unescaped_docstring(self, text):
        if self._active_doc_string_separator == '"""':
            return text.replace('\\"\\"\\"', '"""')
        elif self._active_doc_string_separator == '```':
            return text.replace('\\`\\`\\`', '```')
        else:
            return text