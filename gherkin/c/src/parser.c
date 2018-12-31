/* This file is generated. Do not edit! Edit gherkin-c-parser.razor instead. */
#include "parser.h"
#include "rule_type.h"
#include "token_scanner.h"
#include "token_matcher.h"
#include "token_queue.h"
#include "error_list.h"
#include <stdlib.h>
#include <setjmp.h>

typedef struct ParserContext {
    bool stop_at_first_error;
    TokenScanner* token_scanner;
    TokenMatcher* token_matcher;
    Builder* builder;
    TokenQueue* token_queue;
    ErrorList* errors;
} ParserContext;

struct Parser {
    ParserContext* parser_context;
    Builder* builder;
    ErrorList* errors;
};

static Token* read_token(ParserContext* context);

static void start_rule(ParserContext* context, RuleType rule_type);

static void end_rule(ParserContext* context, RuleType rule_type);

static int match_token(int state, Token* token, ParserContext* context);

ParserContext* ParserContext_new(TokenScanner* token_scanner, TokenMatcher* token_matcher, Builder* builder, TokenQueue* token_queue, ErrorList* errors) {
    ParserContext* parser_context = (ParserContext*)malloc(sizeof(ParserContext));
    parser_context->stop_at_first_error = false;
    parser_context->token_scanner = token_scanner;
    parser_context->token_matcher = token_matcher;
    parser_context->builder = builder;
    parser_context->token_queue = token_queue;
    parser_context->errors = errors;
    return parser_context;
}

void ParserContext_delete(ParserContext* parser_context) {
    free((void*)parser_context);
}

Parser* Parser_new(Builder* builder) {
    Parser* parser = (Parser*)malloc(sizeof(Parser));
    parser->parser_context = 0;
    parser->builder = builder;
    parser->errors = ErrorList_new();
    return parser;
}

void Parser_delete(Parser* parser) {
    if (parser->errors) {
        ErrorList_delete(parser->errors);
    }
    if (parser->parser_context) {
        ParserContext_delete(parser->parser_context);
    }
    free((void*)parser);
}

int Parser_parse(Parser* parser, TokenMatcher* token_matcher, TokenScanner* token_scanner) {
    parser->builder->reset(parser->builder);
    parser->builder->set_error_context(parser->builder, parser->errors);
    token_matcher->reset(token_matcher);
    token_matcher->errors = parser->errors;
    TokenQueue* token_queue = TokenQueue_new();
    ParserContext* context = ParserContext_new(token_scanner, token_matcher, parser->builder, token_queue, parser->errors);

    int val = 0;
    jmp_buf env;
    val = setjmp(env);
    ErrorList_set_global_rescue_env(parser->errors, &env);

    if (val == 0) {
        start_rule(context, Rule_GherkinDocument);
        int state = 0;
        bool token_is_eof;
        Token* token = 0;
        do {
            token = read_token(context);
            token_is_eof = Token_is_eof(token);
            state = match_token(state, token, context);
        } while (!token_is_eof);

        end_rule(context, Rule_GherkinDocument);
    }

    int result_code = ErrorList_is_empty(context->errors) ? 0 : 1;
    
    ParserContext_delete(context);
    TokenQueue_delete(token_queue);
    return result_code;
}
bool Parser_has_more_errors(Parser* parser) {
    return ErrorList_has_more_errors(parser->errors);
}

Error* Parser_next_error(Parser* parser) {
    return ErrorList_next_error(parser->errors);
}

static Token* read_token(ParserContext* context) {
    if (!TokenQueue_is_empty(context->token_queue))
        return TokenQueue_remove(context->token_queue);
    else
        return context->token_scanner->read(context->token_scanner);
}

static void build(ParserContext* context, Token* token) {
    context->builder->build(context->builder, token);
}

static void handle_ast_error(ParserContext* context, RuleType rule_type, rule_function action) {
    if (context->stop_at_first_error) {
        action(context->builder, rule_type);
        return;
    }

    jmp_buf env;
    int val = setjmp(env);
    ErrorList_set_local_rescue_env(context->errors, &env);
    if (val == 0) {    
        action(context->builder, rule_type);
    }
}

static void start_rule(ParserContext* context, RuleType rule_type) {
    handle_ast_error(context, rule_type, context->builder->start_rule);
}

static void end_rule(ParserContext* context, RuleType rule_type) {
    handle_ast_error(context, rule_type, context->builder->end_rule);
}

static bool handle_external_error(ParserContext* context, Token* token, match_function action) {
    if (context->stop_at_first_error) {
        return action(context->token_matcher, token);
    }

    jmp_buf env;
    int val = setjmp(env);
    ErrorList_set_local_rescue_env(context->errors, &env);
    if (val == 0) {    
        return action(context->token_matcher, token);
    }
    return false;
}


static bool match_EOF(ParserContext* context, Token* token) {
    return handle_external_error(context, token, context->token_matcher->match_EOF);
}

static bool match_Empty(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_Empty);
}

static bool match_Comment(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_Comment);
}

static bool match_TagLine(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_TagLine);
}

static bool match_FeatureLine(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_FeatureLine);
}

static bool match_RuleLine(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_RuleLine);
}

static bool match_BackgroundLine(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_BackgroundLine);
}

static bool match_ScenarioLine(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_ScenarioLine);
}

static bool match_ExamplesLine(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_ExamplesLine);
}

static bool match_StepLine(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_StepLine);
}

static bool match_DocStringSeparator(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_DocStringSeparator);
}

static bool match_TableRow(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_TableRow);
}

static bool match_Language(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_Language);
}

static bool match_Other(ParserContext* context, Token* token) {
    if (token->matched_type == Token_EOF) {
        return false;
    };
    return handle_external_error(context, token, context->token_matcher->match_Other);
}


static bool lookahead_0(ParserContext* context) {
    Token* token = 0;
    TokenQueue* queue = TokenQueue_new();
    bool match = false;
    while (true) {
        token = read_token(context);
        TokenQueue_add(queue, token);

        if (match_ExamplesLine(context, token) || false) {
            match = true;
            break;
        }

        if (!(match_Empty(context, token) || match_Comment(context, token) || match_TagLine(context, token) || false)) {
            break;
        } 
    }

    TokenQueue_extend(context->token_queue, queue);

    return match;
}



/* Start */
static int match_token_at_0(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        build(context, token);
        return 41;
    }
    if (match_Language(context, token)) {
        start_rule(context, Rule_Feature);
        start_rule(context, Rule_FeatureHeader);
        build(context, token);
        return 1;
    }
    if (match_TagLine(context, token)) {
        start_rule(context, Rule_Feature);
        start_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 2;
    }
    if (match_FeatureLine(context, token)) {
        start_rule(context, Rule_Feature);
        start_rule(context, Rule_FeatureHeader);
        build(context, token);
        return 3;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 0;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 0;
    }
    
    /* "State: 0 - Start" */
    const wchar_t* const expected_tokens = L"#EOF, #Language, #TagLine, #FeatureLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 0;
}

/* GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0 */
static int match_token_at_1(Token* token, ParserContext* context) {
    if (match_TagLine(context, token)) {
        start_rule(context, Rule_Tags);
        build(context, token);
        return 2;
    }
    if (match_FeatureLine(context, token)) {
        build(context, token);
        return 3;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 1;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 1;
    }
    
    /* "State: 1 - GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0" */
    const wchar_t* const expected_tokens = L"#TagLine, #FeatureLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 1;
}

/* GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0 */
static int match_token_at_2(Token* token, ParserContext* context) {
    if (match_TagLine(context, token)) {
        build(context, token);
        return 2;
    }
    if (match_FeatureLine(context, token)) {
        end_rule(context, Rule_Tags);
        build(context, token);
        return 3;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 2;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 2;
    }
    
    /* "State: 2 - GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0" */
    const wchar_t* const expected_tokens = L"#TagLine, #FeatureLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 2;
}

/* GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0 */
static int match_token_at_3(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 3;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 5;
    }
    if (match_BackgroundLine(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_Background);
        build(context, token);
        return 6;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        start_rule(context, Rule_Description);
        build(context, token);
        return 4;
    }
    
    /* "State: 3 - GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Empty, #Comment, #BackgroundLine, #TagLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 3;
}

/* GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>#Other:0 */
static int match_token_at_4(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_FeatureHeader);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        end_rule(context, Rule_Description);
        build(context, token);
        return 5;
    }
    if (match_BackgroundLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_Background);
        build(context, token);
        return 6;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 4;
    }
    
    /* "State: 4 - GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>#Other:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #BackgroundLine, #TagLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 4;
}

/* GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:2>#Comment:0 */
static int match_token_at_5(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 5;
    }
    if (match_BackgroundLine(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_Background);
        build(context, token);
        return 6;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_FeatureHeader);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 5;
    }
    
    /* "State: 5 - GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:2>#Comment:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #BackgroundLine, #TagLine, #ScenarioLine, #RuleLine, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 5;
}

/* GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0 */
static int match_token_at_6(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 6;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 8;
    }
    if (match_StepLine(context, token)) {
        start_rule(context, Rule_Step);
        build(context, token);
        return 9;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        start_rule(context, Rule_Description);
        build(context, token);
        return 7;
    }
    
    /* "State: 6 - GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Empty, #Comment, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 6;
}

/* GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>#Other:0 */
static int match_token_at_7(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        end_rule(context, Rule_Description);
        build(context, token);
        return 8;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_Step);
        build(context, token);
        return 9;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 7;
    }
    
    /* "State: 7 - GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>#Other:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 7;
}

/* GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:2>#Comment:0 */
static int match_token_at_8(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 8;
    }
    if (match_StepLine(context, token)) {
        start_rule(context, Rule_Step);
        build(context, token);
        return 9;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 8;
    }
    
    /* "State: 8 - GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:2>#Comment:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 8;
}

/* GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0 */
static int match_token_at_9(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        start_rule(context, Rule_DataTable);
        build(context, token);
        return 10;
    }
    if (match_DocStringSeparator(context, token)) {
        start_rule(context, Rule_DocString);
        build(context, token);
        return 48;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 9;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 9;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 9;
    }
    
    /* "State: 9 - GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 9;
}

/* GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0 */
static int match_token_at_10(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        build(context, token);
        return 10;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 9;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 10;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 10;
    }
    
    /* "State: 10 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 10;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0 */
static int match_token_at_11(Token* token, ParserContext* context) {
    if (match_TagLine(context, token)) {
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Tags);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 11;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 11;
    }
    
    /* "State: 11 - GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0" */
    const wchar_t* const expected_tokens = L"#TagLine, #ScenarioLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 11;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0 */
static int match_token_at_12(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 12;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 14;
    }
    if (match_StepLine(context, token)) {
        start_rule(context, Rule_Step);
        build(context, token);
        return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        start_rule(context, Rule_Description);
        build(context, token);
        return 13;
    }
    
    /* "State: 12 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Empty, #Comment, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 12;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0 */
static int match_token_at_13(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        end_rule(context, Rule_Description);
        build(context, token);
        return 14;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_Step);
        build(context, token);
        return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 13;
    }
    
    /* "State: 13 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 13;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0 */
static int match_token_at_14(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 14;
    }
    if (match_StepLine(context, token)) {
        start_rule(context, Rule_Step);
        build(context, token);
        return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 14;
    }
    
    /* "State: 14 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 14;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0 */
static int match_token_at_15(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        start_rule(context, Rule_DataTable);
        build(context, token);
        return 16;
    }
    if (match_DocStringSeparator(context, token)) {
        start_rule(context, Rule_DocString);
        build(context, token);
        return 46;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 15;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 15;
    }
    
    /* "State: 15 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 15;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0 */
static int match_token_at_16(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        build(context, token);
        return 16;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 16;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 16;
    }
    
    /* "State: 16 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 16;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0 */
static int match_token_at_17(Token* token, ParserContext* context) {
    if (match_TagLine(context, token)) {
        build(context, token);
        return 17;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Tags);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 17;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 17;
    }
    
    /* "State: 17 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0" */
    const wchar_t* const expected_tokens = L"#TagLine, #ExamplesLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 17;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0 */
static int match_token_at_18(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 18;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 20;
    }
    if (match_TableRow(context, token)) {
        start_rule(context, Rule_ExamplesTable);
        build(context, token);
        return 21;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        start_rule(context, Rule_Description);
        build(context, token);
        return 19;
    }
    
    /* "State: 18 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Empty, #Comment, #TableRow, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 18;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0 */
static int match_token_at_19(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        end_rule(context, Rule_Description);
        build(context, token);
        return 20;
    }
    if (match_TableRow(context, token)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_ExamplesTable);
        build(context, token);
        return 21;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 19;
    }
    
    /* "State: 19 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #TableRow, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 19;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0 */
static int match_token_at_20(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 20;
    }
    if (match_TableRow(context, token)) {
        start_rule(context, Rule_ExamplesTable);
        build(context, token);
        return 21;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 20;
    }
    
    /* "State: 20 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #TableRow, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 20;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0 */
static int match_token_at_21(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        build(context, token);
        return 21;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 21;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 21;
    }
    
    /* "State: 21 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 21;
}

/* GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>#RuleLine:0 */
static int match_token_at_22(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_RuleHeader);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 24;
    }
    if (match_BackgroundLine(context, token)) {
        end_rule(context, Rule_RuleHeader);
        start_rule(context, Rule_Background);
        build(context, token);
        return 25;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_RuleHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_RuleHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_RuleHeader);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        start_rule(context, Rule_Description);
        build(context, token);
        return 23;
    }
    
    /* "State: 22 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>#RuleLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Empty, #Comment, #BackgroundLine, #TagLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 22;
}

/* GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:1>Description:0>#Other:0 */
static int match_token_at_23(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_RuleHeader);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        end_rule(context, Rule_Description);
        build(context, token);
        return 24;
    }
    if (match_BackgroundLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_RuleHeader);
        start_rule(context, Rule_Background);
        build(context, token);
        return 25;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_RuleHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_RuleHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_RuleHeader);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 23;
    }
    
    /* "State: 23 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:1>Description:0>#Other:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #BackgroundLine, #TagLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 23;
}

/* GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:2>#Comment:0 */
static int match_token_at_24(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_RuleHeader);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 24;
    }
    if (match_BackgroundLine(context, token)) {
        end_rule(context, Rule_RuleHeader);
        start_rule(context, Rule_Background);
        build(context, token);
        return 25;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_RuleHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_RuleHeader);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_RuleHeader);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 24;
    }
    
    /* "State: 24 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:2>#Comment:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #BackgroundLine, #TagLine, #ScenarioLine, #RuleLine, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 24;
}

/* GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0 */
static int match_token_at_25(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 25;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 27;
    }
    if (match_StepLine(context, token)) {
        start_rule(context, Rule_Step);
        build(context, token);
        return 28;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        start_rule(context, Rule_Description);
        build(context, token);
        return 26;
    }
    
    /* "State: 25 - GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Empty, #Comment, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 25;
}

/* GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>#Other:0 */
static int match_token_at_26(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        end_rule(context, Rule_Description);
        build(context, token);
        return 27;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_Step);
        build(context, token);
        return 28;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 26;
    }
    
    /* "State: 26 - GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>#Other:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 26;
}

/* GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:2>#Comment:0 */
static int match_token_at_27(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 27;
    }
    if (match_StepLine(context, token)) {
        start_rule(context, Rule_Step);
        build(context, token);
        return 28;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 27;
    }
    
    /* "State: 27 - GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:2>#Comment:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 27;
}

/* GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0 */
static int match_token_at_28(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        start_rule(context, Rule_DataTable);
        build(context, token);
        return 29;
    }
    if (match_DocStringSeparator(context, token)) {
        start_rule(context, Rule_DocString);
        build(context, token);
        return 44;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 28;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 28;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 28;
    }
    
    /* "State: 28 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 28;
}

/* GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0 */
static int match_token_at_29(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        build(context, token);
        return 29;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 28;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 29;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 29;
    }
    
    /* "State: 29 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 29;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0 */
static int match_token_at_30(Token* token, ParserContext* context) {
    if (match_TagLine(context, token)) {
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Tags);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 30;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 30;
    }
    
    /* "State: 30 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0" */
    const wchar_t* const expected_tokens = L"#TagLine, #ScenarioLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 30;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0 */
static int match_token_at_31(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 31;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 33;
    }
    if (match_StepLine(context, token)) {
        start_rule(context, Rule_Step);
        build(context, token);
        return 34;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        start_rule(context, Rule_Description);
        build(context, token);
        return 32;
    }
    
    /* "State: 31 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Empty, #Comment, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 31;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0 */
static int match_token_at_32(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        end_rule(context, Rule_Description);
        build(context, token);
        return 33;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_Step);
        build(context, token);
        return 34;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 32;
    }
    
    /* "State: 32 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 32;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0 */
static int match_token_at_33(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 33;
    }
    if (match_StepLine(context, token)) {
        start_rule(context, Rule_Step);
        build(context, token);
        return 34;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 33;
    }
    
    /* "State: 33 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 33;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0 */
static int match_token_at_34(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        start_rule(context, Rule_DataTable);
        build(context, token);
        return 35;
    }
    if (match_DocStringSeparator(context, token)) {
        start_rule(context, Rule_DocString);
        build(context, token);
        return 42;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 34;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 34;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 34;
    }
    
    /* "State: 34 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 34;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0 */
static int match_token_at_35(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        build(context, token);
        return 35;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 34;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_DataTable);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 35;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 35;
    }
    
    /* "State: 35 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 35;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0 */
static int match_token_at_36(Token* token, ParserContext* context) {
    if (match_TagLine(context, token)) {
        build(context, token);
        return 36;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Tags);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 36;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 36;
    }
    
    /* "State: 36 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0" */
    const wchar_t* const expected_tokens = L"#TagLine, #ExamplesLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 36;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0 */
static int match_token_at_37(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 37;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 39;
    }
    if (match_TableRow(context, token)) {
        start_rule(context, Rule_ExamplesTable);
        build(context, token);
        return 40;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        start_rule(context, Rule_Description);
        build(context, token);
        return 38;
    }
    
    /* "State: 37 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Empty, #Comment, #TableRow, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 37;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0 */
static int match_token_at_38(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        end_rule(context, Rule_Description);
        build(context, token);
        return 39;
    }
    if (match_TableRow(context, token)) {
        end_rule(context, Rule_Description);
        start_rule(context, Rule_ExamplesTable);
        build(context, token);
        return 40;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Description);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 38;
    }
    
    /* "State: 38 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #TableRow, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 38;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0 */
static int match_token_at_39(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 39;
    }
    if (match_TableRow(context, token)) {
        start_rule(context, Rule_ExamplesTable);
        build(context, token);
        return 40;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 39;
    }
    
    /* "State: 39 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0" */
    const wchar_t* const expected_tokens = L"#EOF, #Comment, #TableRow, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 39;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0 */
static int match_token_at_40(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_TableRow(context, token)) {
        build(context, token);
        return 40;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_ExamplesTable);
        end_rule(context, Rule_Examples);
        end_rule(context, Rule_ExamplesDefinition);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 40;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 40;
    }
    
    /* "State: 40 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0" */
    const wchar_t* const expected_tokens = L"#EOF, #TableRow, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 40;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0 */
static int match_token_at_42(Token* token, ParserContext* context) {
    if (match_DocStringSeparator(context, token)) {
        build(context, token);
        return 43;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 42;
    }
    
    /* "State: 42 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0" */
    const wchar_t* const expected_tokens = L"#DocStringSeparator, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 42;
}

/* GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0 */
static int match_token_at_43(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 34;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 36;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 37;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 43;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 43;
    }
    
    /* "State: 43 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0" */
    const wchar_t* const expected_tokens = L"#EOF, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 43;
}

/* GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0 */
static int match_token_at_44(Token* token, ParserContext* context) {
    if (match_DocStringSeparator(context, token)) {
        build(context, token);
        return 45;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 44;
    }
    
    /* "State: 44 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0" */
    const wchar_t* const expected_tokens = L"#DocStringSeparator, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 44;
}

/* GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0 */
static int match_token_at_45(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 28;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 30;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 31;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Rule);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 45;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 45;
    }
    
    /* "State: 45 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0" */
    const wchar_t* const expected_tokens = L"#EOF, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 45;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0 */
static int match_token_at_46(Token* token, ParserContext* context) {
    if (match_DocStringSeparator(context, token)) {
        build(context, token);
        return 47;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 46;
    }
    
    /* "State: 46 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0" */
    const wchar_t* const expected_tokens = L"#DocStringSeparator, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 46;
}

/* GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0 */
static int match_token_at_47(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ExamplesLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_ExamplesDefinition);
        start_rule(context, Rule_Examples);
        build(context, token);
        return 18;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Scenario);
        end_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 47;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 47;
    }
    
    /* "State: 47 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0" */
    const wchar_t* const expected_tokens = L"#EOF, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 47;
}

/* GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0 */
static int match_token_at_48(Token* token, ParserContext* context) {
    if (match_DocStringSeparator(context, token)) {
        build(context, token);
        return 49;
    }
    if (match_Other(context, token)) {
        build(context, token);
        return 48;
    }
    
    /* "State: 48 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0" */
    const wchar_t* const expected_tokens = L"#DocStringSeparator, #Other";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 48;
}

/* GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0 */
static int match_token_at_49(Token* token, ParserContext* context) {
    if (match_EOF(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        end_rule(context, Rule_Feature);
        build(context, token);
        return 41;
    }
    if (match_StepLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        start_rule(context, Rule_Step);
        build(context, token);
        return 9;
    }
    if (match_TagLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Tags);
        build(context, token);
        return 11;
    }
    if (match_ScenarioLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_ScenarioDefinition);
        start_rule(context, Rule_Scenario);
        build(context, token);
        return 12;
    }
    if (match_RuleLine(context, token)) {
        end_rule(context, Rule_DocString);
        end_rule(context, Rule_Step);
        end_rule(context, Rule_Background);
        start_rule(context, Rule_Rule);
        start_rule(context, Rule_RuleHeader);
        build(context, token);
        return 22;
    }
    if (match_Comment(context, token)) {
        build(context, token);
        return 49;
    }
    if (match_Empty(context, token)) {
        build(context, token);
        return 49;
    }
    
    /* "State: 49 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0" */
    const wchar_t* const expected_tokens = L"#EOF, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty";
    Token_is_eof(token) ? ErrorList_add_unexpected_eof_error(context->errors, token, expected_tokens) : ErrorList_add_unexpected_token_error(context->errors, token, expected_tokens);
    Token_delete(token);
    if (context->stop_at_first_error) {
        ErrorList_jump_to_global_rescue_env(context->errors);
    }
    return 49;
}

static int match_token(int state, Token* token, ParserContext* context) {
    switch (state) {
    case 0:
        return match_token_at_0(token, context);
    case 1:
        return match_token_at_1(token, context);
    case 2:
        return match_token_at_2(token, context);
    case 3:
        return match_token_at_3(token, context);
    case 4:
        return match_token_at_4(token, context);
    case 5:
        return match_token_at_5(token, context);
    case 6:
        return match_token_at_6(token, context);
    case 7:
        return match_token_at_7(token, context);
    case 8:
        return match_token_at_8(token, context);
    case 9:
        return match_token_at_9(token, context);
    case 10:
        return match_token_at_10(token, context);
    case 11:
        return match_token_at_11(token, context);
    case 12:
        return match_token_at_12(token, context);
    case 13:
        return match_token_at_13(token, context);
    case 14:
        return match_token_at_14(token, context);
    case 15:
        return match_token_at_15(token, context);
    case 16:
        return match_token_at_16(token, context);
    case 17:
        return match_token_at_17(token, context);
    case 18:
        return match_token_at_18(token, context);
    case 19:
        return match_token_at_19(token, context);
    case 20:
        return match_token_at_20(token, context);
    case 21:
        return match_token_at_21(token, context);
    case 22:
        return match_token_at_22(token, context);
    case 23:
        return match_token_at_23(token, context);
    case 24:
        return match_token_at_24(token, context);
    case 25:
        return match_token_at_25(token, context);
    case 26:
        return match_token_at_26(token, context);
    case 27:
        return match_token_at_27(token, context);
    case 28:
        return match_token_at_28(token, context);
    case 29:
        return match_token_at_29(token, context);
    case 30:
        return match_token_at_30(token, context);
    case 31:
        return match_token_at_31(token, context);
    case 32:
        return match_token_at_32(token, context);
    case 33:
        return match_token_at_33(token, context);
    case 34:
        return match_token_at_34(token, context);
    case 35:
        return match_token_at_35(token, context);
    case 36:
        return match_token_at_36(token, context);
    case 37:
        return match_token_at_37(token, context);
    case 38:
        return match_token_at_38(token, context);
    case 39:
        return match_token_at_39(token, context);
    case 40:
        return match_token_at_40(token, context);
    case 42:
        return match_token_at_42(token, context);
    case 43:
        return match_token_at_43(token, context);
    case 44:
        return match_token_at_44(token, context);
    case 45:
        return match_token_at_45(token, context);
    case 46:
        return match_token_at_46(token, context);
    case 47:
        return match_token_at_47(token, context);
    case 48:
        return match_token_at_48(token, context);
    case 49:
        return match_token_at_49(token, context);
    default:
        ErrorList_add_invalid_operation_error(context->errors, state);
        ErrorList_jump_to_global_rescue_env(context->errors);
        return -1;
    }
}
