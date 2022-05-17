from .ast_builder import AstBuilder


class TokenFormatterBuilder(AstBuilder):
    def __init__(self):
        super().__init__()
        self.reset()

    def reset(self):
        self._tokens = []

    def build(self, token):
        self._tokens.append(token)

    def start_rule(self, rule_type):
        pass

    def end_rule(self, rule_type):
        pass

    def get_result(self):
        return '\n'.join([self._format_token(token) for token in self._tokens])

    @staticmethod
    def _format_token(token):
        if token.eof():
            return "EOF"

        return ''.join(
            ['(', str(token.location['line']), ':', str(token.location['column']), ')', token.matched_type, ':',
             token.matched_keyword or '', '/', token.matched_text or "", '/',
             ','.join([str(item['column']) + ':' + item['text'] for item in token.matched_items])])
