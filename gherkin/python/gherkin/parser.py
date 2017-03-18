# This file is generated. Do not edit! Edit gherkin-python.razor instead.
import sys
from collections import deque
from .ast_builder import AstBuilder
from .token_matcher import TokenMatcher
from .token_scanner import TokenScanner
from .errors import UnexpectedEOFException, UnexpectedTokenException, ParserException, CompositeParserException

RULE_TYPE = [
    'None',
    '_EOF',  # #EOF
    '_Empty',  # #Empty
    '_Comment',  # #Comment
    '_TagLine',  # #TagLine
    '_FeatureLine',  # #FeatureLine
    '_BackgroundLine',  # #BackgroundLine
    '_ScenarioLine',  # #ScenarioLine
    '_ScenarioOutlineLine',  # #ScenarioOutlineLine
    '_ExamplesLine',  # #ExamplesLine
    '_StepLine',  # #StepLine
    '_DocStringSeparator',  # #DocStringSeparator
    '_TableRow',  # #TableRow
    '_Language',  # #Language
    '_Other',  # #Other
    'GherkinDocument',  # GherkinDocument! := Feature?
    'Feature',  # Feature! := Feature_Header Background? Scenario_Definition*
    'Feature_Header',  # Feature_Header! := #Language? Tags? #FeatureLine Feature_Description
    'Background',  # Background! := #BackgroundLine Background_Description Scenario_Step*
    'Scenario_Definition',  # Scenario_Definition! := Tags? (Scenario | ScenarioOutline)
    'Scenario',  # Scenario! := #ScenarioLine Scenario_Description Scenario_Step*
    'ScenarioOutline',  # ScenarioOutline! := #ScenarioOutlineLine ScenarioOutline_Description ScenarioOutline_Step* Examples_Definition*
    'Examples_Definition',  # Examples_Definition! [#Empty|#Comment|#TagLine-&gt;#ExamplesLine] := Tags? Examples
    'Examples',  # Examples! := #ExamplesLine Examples_Description Examples_Table?
    'Examples_Table',  # Examples_Table! := #TableRow #TableRow*
    'Scenario_Step',  # Scenario_Step := Step
    'ScenarioOutline_Step',  # ScenarioOutline_Step := Step
    'Step',  # Step! := #StepLine Step_Arg?
    'Step_Arg',  # Step_Arg := (DataTable | DocString)
    'DataTable',  # DataTable! := #TableRow+
    'DocString',  # DocString! := #DocStringSeparator #Other* #DocStringSeparator
    'Tags',  # Tags! := #TagLine+
    'Feature_Description',  # Feature_Description := Description_Helper
    'Background_Description',  # Background_Description := Description_Helper
    'Scenario_Description',  # Scenario_Description := Description_Helper
    'ScenarioOutline_Description',  # ScenarioOutline_Description := Description_Helper
    'Examples_Description',  # Examples_Description := Description_Helper
    'Description_Helper',  # Description_Helper := #Empty* Description? #Comment*
    'Description',  # Description! := #Other+
]


class ParserContext(object):
    def __init__(self, token_scanner, token_matcher, token_queue, errors):
        self.token_scanner = token_scanner
        self.token_matcher = token_matcher
        self.token_queue = token_queue
        self.errors = errors


class Parser(object):
    def __init__(self, ast_builder=AstBuilder()):
        self.ast_builder = ast_builder
        self.stop_at_first_error = False

    def parse(self, token_scanner_or_str, token_matcher=TokenMatcher()):
        if sys.version_info < (3, 0):
            token_scanner = TokenScanner(token_scanner_or_str) if isinstance(token_scanner_or_str, basestring) else token_scanner_or_str
        else:
            token_scanner = TokenScanner(token_scanner_or_str) if isinstance(token_scanner_or_str, str) else token_scanner_or_str
        self.ast_builder.reset()
        token_matcher.reset()
        context = ParserContext(
            token_scanner,
            token_matcher,
            deque(),
            [])

        self.start_rule(context, 'GherkinDocument')
        state = 0
        token = None
        while True:
            token = self.read_token(context)
            state = self.match_token(state, token, context)
            if token.eof():
                break

        self.end_rule(context, 'GherkinDocument')

        if context.errors:
            raise CompositeParserException(context.errors)

        return self.get_result()

    def build(self, context, token):
        self.handle_ast_error(context, token, self.ast_builder.build)

    def add_error(self, context, error):
        context.errors.append(error)
        if len(context.errors) > 10:
            raise CompositeParserException(context.errors)

    def start_rule(self, context, rule_type):
        self.handle_ast_error(context, rule_type, self.ast_builder.start_rule)

    def end_rule(self, context, rule_type):
        self.handle_ast_error(context, rule_type, self.ast_builder.end_rule)

    def get_result(self):
        return self.ast_builder.get_result()

    def read_token(self, context):
        if context.token_queue:
            return context.token_queue.popleft()
        else:
            return context.token_scanner.read()

    def match_EOF(self, context, token):
        return self.handle_external_error(context, False, token, context.token_matcher.match_EOF)

    def match_Empty(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_Empty)

    def match_Comment(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_Comment)

    def match_TagLine(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_TagLine)

    def match_FeatureLine(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_FeatureLine)

    def match_BackgroundLine(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_BackgroundLine)

    def match_ScenarioLine(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_ScenarioLine)

    def match_ScenarioOutlineLine(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_ScenarioOutlineLine)

    def match_ExamplesLine(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_ExamplesLine)

    def match_StepLine(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_StepLine)

    def match_DocStringSeparator(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_DocStringSeparator)

    def match_TableRow(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_TableRow)

    def match_Language(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_Language)

    def match_Other(self, context, token):
        if token.eof():
            return False
        return self.handle_external_error(context, False, token, context.token_matcher.match_Other)

    def match_token(self, state, token, context):
        state_map = {
            0: self.match_token_at_0,
            1: self.match_token_at_1,
            2: self.match_token_at_2,
            3: self.match_token_at_3,
            4: self.match_token_at_4,
            5: self.match_token_at_5,
            6: self.match_token_at_6,
            7: self.match_token_at_7,
            8: self.match_token_at_8,
            9: self.match_token_at_9,
            10: self.match_token_at_10,
            11: self.match_token_at_11,
            12: self.match_token_at_12,
            13: self.match_token_at_13,
            14: self.match_token_at_14,
            15: self.match_token_at_15,
            16: self.match_token_at_16,
            17: self.match_token_at_17,
            18: self.match_token_at_18,
            19: self.match_token_at_19,
            20: self.match_token_at_20,
            21: self.match_token_at_21,
            22: self.match_token_at_22,
            23: self.match_token_at_23,
            24: self.match_token_at_24,
            25: self.match_token_at_25,
            26: self.match_token_at_26,
            28: self.match_token_at_28,
            29: self.match_token_at_29,
            30: self.match_token_at_30,
            31: self.match_token_at_31,
            32: self.match_token_at_32,
            33: self.match_token_at_33,
        }
        if state in state_map:
            return state_map[state](token, context)
        else:
            raise RuntimeError("Unknown state: " + str(state))

    # Start
    def match_token_at_0(self, token, context):
        if self.match_EOF(context, token):
                self.build(context, token)
                return 27
        if self.match_Language(context, token):
                self.start_rule(context, 'Feature')
                self.start_rule(context, 'Feature_Header')
                self.build(context, token)
                return 1
        if self.match_TagLine(context, token):
                self.start_rule(context, 'Feature')
                self.start_rule(context, 'Feature_Header')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 2
        if self.match_FeatureLine(context, token):
                self.start_rule(context, 'Feature')
                self.start_rule(context, 'Feature_Header')
                self.build(context, token)
                return 3
        if self.match_Comment(context, token):
                self.build(context, token)
                return 0
        if self.match_Empty(context, token):
                self.build(context, token)
                return 0

        state_comment = "State: 0 - Start"
        token.detach
        expected_tokens = ["#EOF", "#Language", "#TagLine", "#FeatureLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 0

    # GherkinDocument:0>Feature:0>Feature_Header:0>#Language:0
    def match_token_at_1(self, token, context):
        if self.match_TagLine(context, token):
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 2
        if self.match_FeatureLine(context, token):
                self.build(context, token)
                return 3
        if self.match_Comment(context, token):
                self.build(context, token)
                return 1
        if self.match_Empty(context, token):
                self.build(context, token)
                return 1

        state_comment = "State: 1 - GherkinDocument:0>Feature:0>Feature_Header:0>#Language:0"
        token.detach
        expected_tokens = ["#TagLine", "#FeatureLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 1

    # GherkinDocument:0>Feature:0>Feature_Header:1>Tags:0>#TagLine:0
    def match_token_at_2(self, token, context):
        if self.match_TagLine(context, token):
                self.build(context, token)
                return 2
        if self.match_FeatureLine(context, token):
                self.end_rule(context, 'Tags')
                self.build(context, token)
                return 3
        if self.match_Comment(context, token):
                self.build(context, token)
                return 2
        if self.match_Empty(context, token):
                self.build(context, token)
                return 2

        state_comment = "State: 2 - GherkinDocument:0>Feature:0>Feature_Header:1>Tags:0>#TagLine:0"
        token.detach
        expected_tokens = ["#TagLine", "#FeatureLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 2

    # GherkinDocument:0>Feature:0>Feature_Header:2>#FeatureLine:0
    def match_token_at_3(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Feature_Header')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Empty(context, token):
                self.build(context, token)
                return 3
        if self.match_Comment(context, token):
                self.build(context, token)
                return 5
        if self.match_BackgroundLine(context, token):
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Background')
                self.build(context, token)
                return 6
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.start_rule(context, 'Description')
                self.build(context, token)
                return 4

        state_comment = "State: 3 - GherkinDocument:0>Feature:0>Feature_Header:2>#FeatureLine:0"
        token.detach
        expected_tokens = ["#EOF", "#Empty", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 3

    # GherkinDocument:0>Feature:0>Feature_Header:3>Feature_Description:0>Description_Helper:1>Description:0>#Other:0
    def match_token_at_4(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Feature_Header')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.end_rule(context, 'Description')
                self.build(context, token)
                return 5
        if self.match_BackgroundLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Background')
                self.build(context, token)
                return 6
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.build(context, token)
                return 4

        state_comment = "State: 4 - GherkinDocument:0>Feature:0>Feature_Header:3>Feature_Description:0>Description_Helper:1>Description:0>#Other:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 4

    # GherkinDocument:0>Feature:0>Feature_Header:3>Feature_Description:0>Description_Helper:2>#Comment:0
    def match_token_at_5(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Feature_Header')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.build(context, token)
                return 5
        if self.match_BackgroundLine(context, token):
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Background')
                self.build(context, token)
                return 6
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Feature_Header')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Empty(context, token):
                self.build(context, token)
                return 5

        state_comment = "State: 5 - GherkinDocument:0>Feature:0>Feature_Header:3>Feature_Description:0>Description_Helper:2>#Comment:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 5

    # GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0
    def match_token_at_6(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Background')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Empty(context, token):
                self.build(context, token)
                return 6
        if self.match_Comment(context, token):
                self.build(context, token)
                return 8
        if self.match_StepLine(context, token):
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 9
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.start_rule(context, 'Description')
                self.build(context, token)
                return 7

        state_comment = "State: 6 - GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0"
        token.detach
        expected_tokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 6

    # GherkinDocument:0>Feature:1>Background:1>Background_Description:0>Description_Helper:1>Description:0>#Other:0
    def match_token_at_7(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Background')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.end_rule(context, 'Description')
                self.build(context, token)
                return 8
        if self.match_StepLine(context, token):
                self.end_rule(context, 'Description')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 9
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.build(context, token)
                return 7

        state_comment = "State: 7 - GherkinDocument:0>Feature:1>Background:1>Background_Description:0>Description_Helper:1>Description:0>#Other:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 7

    # GherkinDocument:0>Feature:1>Background:1>Background_Description:0>Description_Helper:2>#Comment:0
    def match_token_at_8(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Background')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.build(context, token)
                return 8
        if self.match_StepLine(context, token):
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 9
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Empty(context, token):
                self.build(context, token)
                return 8

        state_comment = "State: 8 - GherkinDocument:0>Feature:1>Background:1>Background_Description:0>Description_Helper:2>#Comment:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 8

    # GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:0>#StepLine:0
    def match_token_at_9(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_TableRow(context, token):
                self.start_rule(context, 'DataTable')
                self.build(context, token)
                return 10
        if self.match_DocStringSeparator(context, token):
                self.start_rule(context, 'DocString')
                self.build(context, token)
                return 32
        if self.match_StepLine(context, token):
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 9
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 9
        if self.match_Empty(context, token):
                self.build(context, token)
                return 9

        state_comment = "State: 9 - GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:0>#StepLine:0"
        token.detach
        expected_tokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 9

    # GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0
    def match_token_at_10(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_TableRow(context, token):
                self.build(context, token)
                return 10
        if self.match_StepLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 9
        if self.match_TagLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 10
        if self.match_Empty(context, token):
                self.build(context, token)
                return 10

        state_comment = "State: 10 - GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0"
        token.detach
        expected_tokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 10

    # GherkinDocument:0>Feature:2>Scenario_Definition:0>Tags:0>#TagLine:0
    def match_token_at_11(self, token, context):
        if self.match_TagLine(context, token):
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Tags')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Tags')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 11
        if self.match_Empty(context, token):
                self.build(context, token)
                return 11

        state_comment = "State: 11 - GherkinDocument:0>Feature:2>Scenario_Definition:0>Tags:0>#TagLine:0"
        token.detach
        expected_tokens = ["#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 11

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:0>#ScenarioLine:0
    def match_token_at_12(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Empty(context, token):
                self.build(context, token)
                return 12
        if self.match_Comment(context, token):
                self.build(context, token)
                return 14
        if self.match_StepLine(context, token):
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 15
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.start_rule(context, 'Description')
                self.build(context, token)
                return 13

        state_comment = "State: 12 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:0>#ScenarioLine:0"
        token.detach
        expected_tokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 12

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:1>Scenario_Description:0>Description_Helper:1>Description:0>#Other:0
    def match_token_at_13(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.end_rule(context, 'Description')
                self.build(context, token)
                return 14
        if self.match_StepLine(context, token):
                self.end_rule(context, 'Description')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 15
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.build(context, token)
                return 13

        state_comment = "State: 13 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:1>Scenario_Description:0>Description_Helper:1>Description:0>#Other:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 13

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:1>Scenario_Description:0>Description_Helper:2>#Comment:0
    def match_token_at_14(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.build(context, token)
                return 14
        if self.match_StepLine(context, token):
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 15
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Empty(context, token):
                self.build(context, token)
                return 14

        state_comment = "State: 14 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:1>Scenario_Description:0>Description_Helper:2>#Comment:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 14

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:0>#StepLine:0
    def match_token_at_15(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_TableRow(context, token):
                self.start_rule(context, 'DataTable')
                self.build(context, token)
                return 16
        if self.match_DocStringSeparator(context, token):
                self.start_rule(context, 'DocString')
                self.build(context, token)
                return 30
        if self.match_StepLine(context, token):
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 15
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 15
        if self.match_Empty(context, token):
                self.build(context, token)
                return 15

        state_comment = "State: 15 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:0>#StepLine:0"
        token.detach
        expected_tokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 15

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0
    def match_token_at_16(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_TableRow(context, token):
                self.build(context, token)
                return 16
        if self.match_StepLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 15
        if self.match_TagLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 16
        if self.match_Empty(context, token):
                self.build(context, token)
                return 16

        state_comment = "State: 16 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0"
        token.detach
        expected_tokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 16

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:0>#ScenarioOutlineLine:0
    def match_token_at_17(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Empty(context, token):
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 19
        if self.match_StepLine(context, token):
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 20
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.start_rule(context, 'Description')
                self.build(context, token)
                return 18

        state_comment = "State: 17 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:0>#ScenarioOutlineLine:0"
        token.detach
        expected_tokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 17

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:1>ScenarioOutline_Description:0>Description_Helper:1>Description:0>#Other:0
    def match_token_at_18(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.end_rule(context, 'Description')
                self.build(context, token)
                return 19
        if self.match_StepLine(context, token):
                self.end_rule(context, 'Description')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 20
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.end_rule(context, 'Description')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.end_rule(context, 'Description')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.build(context, token)
                return 18

        state_comment = "State: 18 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:1>ScenarioOutline_Description:0>Description_Helper:1>Description:0>#Other:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 18

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:1>ScenarioOutline_Description:0>Description_Helper:2>#Comment:0
    def match_token_at_19(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.build(context, token)
                return 19
        if self.match_StepLine(context, token):
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 20
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Empty(context, token):
                self.build(context, token)
                return 19

        state_comment = "State: 19 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:1>ScenarioOutline_Description:0>Description_Helper:2>#Comment:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 19

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:0>#StepLine:0
    def match_token_at_20(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_TableRow(context, token):
                self.start_rule(context, 'DataTable')
                self.build(context, token)
                return 21
        if self.match_DocStringSeparator(context, token):
                self.start_rule(context, 'DocString')
                self.build(context, token)
                return 28
        if self.match_StepLine(context, token):
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 20
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 20
        if self.match_Empty(context, token):
                self.build(context, token)
                return 20

        state_comment = "State: 20 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:0>#StepLine:0"
        token.detach
        expected_tokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 20

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0
    def match_token_at_21(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_TableRow(context, token):
                self.build(context, token)
                return 21
        if self.match_StepLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 20
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'DataTable')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 21
        if self.match_Empty(context, token):
                self.build(context, token)
                return 21

        state_comment = "State: 21 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0"
        token.detach
        expected_tokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 21

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:0>Tags:0>#TagLine:0
    def match_token_at_22(self, token, context):
        if self.match_TagLine(context, token):
                self.build(context, token)
                return 22
        if self.match_ExamplesLine(context, token):
                self.end_rule(context, 'Tags')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_Comment(context, token):
                self.build(context, token)
                return 22
        if self.match_Empty(context, token):
                self.build(context, token)
                return 22

        state_comment = "State: 22 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:0>Tags:0>#TagLine:0"
        token.detach
        expected_tokens = ["#TagLine", "#ExamplesLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 22

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:0>#ExamplesLine:0
    def match_token_at_23(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Empty(context, token):
                self.build(context, token)
                return 23
        if self.match_Comment(context, token):
                self.build(context, token)
                return 25
        if self.match_TableRow(context, token):
                self.start_rule(context, 'Examples_Table')
                self.build(context, token)
                return 26
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.start_rule(context, 'Description')
                self.build(context, token)
                return 24

        state_comment = "State: 23 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:0>#ExamplesLine:0"
        token.detach
        expected_tokens = ["#EOF", "#Empty", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 23

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:1>Examples_Description:0>Description_Helper:1>Description:0>#Other:0
    def match_token_at_24(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.end_rule(context, 'Description')
                self.build(context, token)
                return 25
        if self.match_TableRow(context, token):
                self.end_rule(context, 'Description')
                self.start_rule(context, 'Examples_Table')
                self.build(context, token)
                return 26
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Description')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Other(context, token):
                self.build(context, token)
                return 24

        state_comment = "State: 24 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:1>Examples_Description:0>Description_Helper:1>Description:0>#Other:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 24

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:1>Examples_Description:0>Description_Helper:2>#Comment:0
    def match_token_at_25(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_Comment(context, token):
                self.build(context, token)
                return 25
        if self.match_TableRow(context, token):
                self.start_rule(context, 'Examples_Table')
                self.build(context, token)
                return 26
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Empty(context, token):
                self.build(context, token)
                return 25

        state_comment = "State: 25 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:1>Examples_Description:0>Description_Helper:2>#Comment:0"
        token.detach
        expected_tokens = ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 25

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:2>Examples_Table:0>#TableRow:0
    def match_token_at_26(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'Examples_Table')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_TableRow(context, token):
                self.build(context, token)
                return 26
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.end_rule(context, 'Examples_Table')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'Examples_Table')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.end_rule(context, 'Examples_Table')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'Examples_Table')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'Examples_Table')
                self.end_rule(context, 'Examples')
                self.end_rule(context, 'Examples_Definition')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 26
        if self.match_Empty(context, token):
                self.build(context, token)
                return 26

        state_comment = "State: 26 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:2>Examples_Table:0>#TableRow:0"
        token.detach
        expected_tokens = ["#EOF", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 26

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0
    def match_token_at_28(self, token, context):
        if self.match_DocStringSeparator(context, token):
                self.build(context, token)
                return 29
        if self.match_Other(context, token):
                self.build(context, token)
                return 28

        state_comment = "State: 28 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0"
        token.detach
        expected_tokens = ["#DocStringSeparator", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 28

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0
    def match_token_at_29(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_StepLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 20
        if self.match_TagLine(context, token):
            if self.lookahead_0(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 22
        if self.match_TagLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ExamplesLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Examples_Definition')
                self.start_rule(context, 'Examples')
                self.build(context, token)
                return 23
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'ScenarioOutline')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 29
        if self.match_Empty(context, token):
                self.build(context, token)
                return 29

        state_comment = "State: 29 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0"
        token.detach
        expected_tokens = ["#EOF", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 29

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0
    def match_token_at_30(self, token, context):
        if self.match_DocStringSeparator(context, token):
                self.build(context, token)
                return 31
        if self.match_Other(context, token):
                self.build(context, token)
                return 30

        state_comment = "State: 30 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0"
        token.detach
        expected_tokens = ["#DocStringSeparator", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 30

    # GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0
    def match_token_at_31(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_StepLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 15
        if self.match_TagLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Scenario')
                self.end_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 31
        if self.match_Empty(context, token):
                self.build(context, token)
                return 31

        state_comment = "State: 31 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0"
        token.detach
        expected_tokens = ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 31

    # GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0
    def match_token_at_32(self, token, context):
        if self.match_DocStringSeparator(context, token):
                self.build(context, token)
                return 33
        if self.match_Other(context, token):
                self.build(context, token)
                return 32

        state_comment = "State: 32 - GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0"
        token.detach
        expected_tokens = ["#DocStringSeparator", "#Other"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 32

    # GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0
    def match_token_at_33(self, token, context):
        if self.match_EOF(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.end_rule(context, 'Feature')
                self.build(context, token)
                return 27
        if self.match_StepLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.start_rule(context, 'Step')
                self.build(context, token)
                return 9
        if self.match_TagLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Tags')
                self.build(context, token)
                return 11
        if self.match_ScenarioLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'Scenario')
                self.build(context, token)
                return 12
        if self.match_ScenarioOutlineLine(context, token):
                self.end_rule(context, 'DocString')
                self.end_rule(context, 'Step')
                self.end_rule(context, 'Background')
                self.start_rule(context, 'Scenario_Definition')
                self.start_rule(context, 'ScenarioOutline')
                self.build(context, token)
                return 17
        if self.match_Comment(context, token):
                self.build(context, token)
                return 33
        if self.match_Empty(context, token):
                self.build(context, token)
                return 33

        state_comment = "State: 33 - GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0"
        token.detach
        expected_tokens = ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"]
        error = UnexpectedEOFException(token, expected_tokens, state_comment) if token.eof() else UnexpectedTokenException(token, expected_tokens, state_comment)
        if (self.stop_at_first_error):
            raise error
        self.add_error(context, error)
        return 33

    def lookahead_0(self, context, currentToken):
        currentToken.detach
        token = None
        queue = []
        match = False
        while True:
            token = self.read_token(context)
            token.detach
            queue.append(token)

            if (self.match_ExamplesLine(context, token) or False):
                match = True
                break

            if not (self.match_Empty(context, token) or self.match_Comment(context, token) or self.match_TagLine(context, token) or False):
                break

        context.token_queue.extend(queue)

        return match

    # private

    def handle_ast_error(self, context, argument, action):
        self.handle_external_error(context, True, argument, action)

    def handle_external_error(self, context, default_value, argument, action):
        if self.stop_at_first_error:
            return action(argument)

        try:
            return action(argument)
        except CompositeParserException as e:
            for error in e.errors:
                self.add_error(context, error)
        except ParserException as e:
            self.add_error(context, e)
        return default_value
