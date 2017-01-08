from collections import defaultdict


class AstNode(object):

    def __init__(self, rule_type):
        self.rule_type = rule_type
        self._sub_items = defaultdict(list)

    def add(self, rule_type, obj):
        self._sub_items[rule_type].append(obj)

    def get_single(self, rule_type):
        return self._sub_items[rule_type][0] if self._sub_items[rule_type] else None

    def get_items(self, rule_type):
        return self._sub_items[rule_type]

    def get_token(self, token_type):
        return self.get_single(token_type)

    def get_tokens(self, token_type):
        return self._sub_items[token_type]
