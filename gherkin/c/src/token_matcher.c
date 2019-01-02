#include "token_matcher.h"
#include "gherkin_line.h"
#include "dialect.h"
#include "error_list.h"
#include <stdbool.h>
#include <stdlib.h>

const wchar_t* const DOC_STRING_SEPARATOR_1 = L"\"\"\"";
const wchar_t* const DOC_STRING_SEPARATOR_2 = L"```";
const wchar_t* const ESCAPED_DOC_STRING_SEPARATOR = L"\\\"\\\"\\\"";

void TokenMatcher_reset(TokenMatcher* token_matcher);

bool TokenMatcher_match_FeatureLine(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_ScenarioLine(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_ScenarioOutlineLine(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_ExamplesLine(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_BackgroundLine(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_StepLine(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_Empty(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_TableRow(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_Comment(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_TagLine(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_DocStringSeparator(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_Language(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_Other(TokenMatcher* token_matcher, Token* token);

bool TokenMatcher_match_EOF(TokenMatcher* token_matcher, Token* token);

static bool match_title_line(Token* token, TokenType matched_type, const Keywords* keywords);

static bool match_step_keywords(Token* token, const Keywords* step_keywords);

static void set_token_matched(Token* token, TokenType matched_type, const wchar_t* text, const wchar_t* keyword, int indent, const Items* cells);

static bool match_DocStringSeparator(TokenMatcher* token_matcher, Token* token, const wchar_t* separator, bool is_open);

static void change_dialect(TokenMatcher* token_matcher, const wchar_t* language, Location* location);

static wchar_t* unescaped_docstring(TokenMatcher* token_matcher, wchar_t* text);

TokenMatcher* TokenMatcher_new(const wchar_t* default_language) {
    TokenMatcher* token_matcher = (TokenMatcher*)malloc(sizeof(TokenMatcher));
    token_matcher->default_language = default_language;
    token_matcher->language = default_language;
    token_matcher->dialect = Dialect_for(default_language);
    token_matcher->active_doc_string_separator = 0;
    token_matcher->indent_to_remove = 0;
    token_matcher->errors = 0;
    token_matcher->reset = &TokenMatcher_reset;
    token_matcher->match_FeatureLine = &TokenMatcher_match_FeatureLine;
    token_matcher->match_ScenarioLine = &TokenMatcher_match_ScenarioLine;
    token_matcher->match_ScenarioOutlineLine = &TokenMatcher_match_ScenarioOutlineLine;
    token_matcher->match_ExamplesLine = &TokenMatcher_match_ExamplesLine;
    token_matcher->match_BackgroundLine = &TokenMatcher_match_BackgroundLine;
    token_matcher->match_StepLine = &TokenMatcher_match_StepLine;
    token_matcher->match_Empty = &TokenMatcher_match_Empty;
    token_matcher->match_TableRow = &TokenMatcher_match_TableRow;
    token_matcher->match_Comment = &TokenMatcher_match_Comment;
    token_matcher->match_TagLine = &TokenMatcher_match_TagLine;
    token_matcher->match_DocStringSeparator = &TokenMatcher_match_DocStringSeparator;
    token_matcher->match_Language = &TokenMatcher_match_Language;
    token_matcher->match_Other = &TokenMatcher_match_Other;
    token_matcher->match_EOF = &TokenMatcher_match_EOF;
    return token_matcher;
}


void TokenMatcher_delete(TokenMatcher* token_matcher) {
    free((void*)token_matcher);
}

void TokenMatcher_reset(TokenMatcher* token_matcher) {
    if (wcscmp(token_matcher->language, token_matcher->default_language) != 0) {
        change_dialect(token_matcher, token_matcher->default_language, 0);
    }
    token_matcher->active_doc_string_separator = 0;
    token_matcher->indent_to_remove = 0;
}


bool TokenMatcher_match_FeatureLine(TokenMatcher* token_matcher, Token* token) {
    if (match_title_line(token, Token_FeatureLine, token_matcher->dialect->feature_keywords)) {
        token->matched_language = token_matcher->language;
        return true;
    }
    return false;
}

bool TokenMatcher_match_ScenarioLine(TokenMatcher* token_matcher, Token* token) {
    if (match_title_line(token, Token_ScenarioLine, token_matcher->dialect->scenario_keywords))
        return true;
    return false;
}

bool TokenMatcher_match_ScenarioOutlineLine(TokenMatcher* token_matcher, Token* token) {
    if (match_title_line(token, Token_ScenarioOutlineLine, token_matcher->dialect->scenario_outline_keywords))
        return true;
    return false;
}

bool TokenMatcher_match_ExamplesLine(TokenMatcher* token_matcher, Token* token) {
    if (match_title_line(token, Token_ExamplesLine, token_matcher->dialect->examples_keywords))
        return true;
    return false;
}

bool TokenMatcher_match_BackgroundLine(TokenMatcher* token_matcher, Token* token) {
    if (match_title_line(token, Token_BackgroundLine, token_matcher->dialect->background_keywords))
        return true;
    return false;
}

bool TokenMatcher_match_StepLine(TokenMatcher* token_matcher, Token* token) {
    if (!token || !token->line)
        return false;
    bool result = match_step_keywords(token, token_matcher->dialect->given_keywords);
    if (result)
        return true;
    result = match_step_keywords(token, token_matcher->dialect->when_keywords);
    if (result)
        return true;
    result = match_step_keywords(token, token_matcher->dialect->then_keywords);
    if (result)
        return true;
    result = match_step_keywords(token, token_matcher->dialect->and_keywords);
    if (result)
        return true;
    result = match_step_keywords(token, token_matcher->dialect->but_keywords);
    return result;
}

bool TokenMatcher_match_Empty(TokenMatcher* token_matcher, Token* token) {
    if (!token || !token->line)
        return false;
    if (GherkinLine_is_empty(token->line)) {
        set_token_matched(token, Token_Empty, 0, 0, -1, 0);
        return true;
    }
    return false;
}

bool TokenMatcher_match_TableRow(TokenMatcher* token_matcher, Token* token) {
    if (!token || !token->line)
        return false;
    if (GherkinLine_start_with(token->line, L"|")) {
        set_token_matched(token, Token_TableRow, 0, 0, -1, GherkinLine_table_cells(token->line));
        return true;
    }
    return false;
}

bool TokenMatcher_match_Comment(TokenMatcher* token_matcher, Token* token) {
    if (!token || !token->line)
        return false;
    if (GherkinLine_start_with(token->line, L"#")) {
        wchar_t* text = GherkinLine_copy_line_text(token->line, 0);
        set_token_matched(token, Token_Comment, text, 0, 0, 0);
        return true;
    }
    return false;
}

bool TokenMatcher_match_TagLine(TokenMatcher* token_matcher, Token* token) {
    if (!token || !token->line)
        return false;
    if (GherkinLine_start_with(token->line, L"@")) {
        set_token_matched(token, Token_TagLine, 0, 0, -1, GherkinLine_tags(token->line));
        return true;
    }
    return false;
}

bool TokenMatcher_match_Language(TokenMatcher* token_matcher, Token* token) {
    if (!token || !token->line)
        return false;
    if (GherkinLine_start_with(token->line, L"#")) {
        if (GherkinLine_is_language_line(token->line)) {
            const wchar_t* language = GherkinLine_get_language(token->line);
            set_token_matched(token, Token_Language, language, 0, -1, 0);
            change_dialect(token_matcher, language, &token->location);
            return true;
        }
    }
    return false;
}

bool TokenMatcher_match_Other(TokenMatcher* token_matcher, Token* token) {
    if (!token || !token->line)
        return false;
    wchar_t* text = GherkinLine_copy_line_text(token->line, token_matcher->indent_to_remove);
    set_token_matched(token, Token_Other, unescaped_docstring(token_matcher, text), 0, 0, 0);
    return true;
}

bool TokenMatcher_match_EOF(TokenMatcher* token_matcher, Token* token) {
    if (!token)
        return false;
    if (!token->line) {
        set_token_matched(token, Token_EOF, 0, 0, -1, 0);
        return true;
    }
    return false;
}

bool TokenMatcher_match_DocStringSeparator(TokenMatcher* token_matcher, Token* token) {
    if (!token_matcher->active_doc_string_separator) {
        return match_DocStringSeparator(token_matcher, token, DOC_STRING_SEPARATOR_1, true) ||
                match_DocStringSeparator(token_matcher, token, DOC_STRING_SEPARATOR_2, true);
    } else {
        return match_DocStringSeparator(token_matcher, token, token_matcher->active_doc_string_separator, false);
    }
}

static bool match_DocStringSeparator(TokenMatcher* token_matcher, Token* token, const wchar_t* separator, bool is_open) {
    if (!token || !token->line)
        return false;
    if (GherkinLine_start_with(token->line, separator)) {
        const wchar_t* content_type = 0;
        if (is_open) {
            content_type = GherkinLine_copy_rest_trimmed(token->line, wcslen(separator));
            token_matcher->active_doc_string_separator = separator;
            token_matcher->indent_to_remove = token->line->indent;
        } else {
            token_matcher->active_doc_string_separator = 0;
            token_matcher->indent_to_remove = 0;
        }
        set_token_matched(token, Token_DocStringSeparator, content_type, separator, -1, 0);
        return true;
    }
    return false;
}

static bool match_title_line(Token* token, TokenType matched_type, const Keywords* keywords) {
    if (!keywords || !token || !token->line)
        return false;
    int i;
    for (i = 0; i < keywords->count; ++i) {
        if (GherkinLine_start_with_title_keyword(token->line, keywords->keywords[i])) {
            wchar_t* title = GherkinLine_copy_rest_trimmed(token->line, wcslen(keywords->keywords[i]) + 1);
            set_token_matched(token, matched_type, title, keywords->keywords[i], -1, 0);
            return true;
        }
    }
    return false;
}

static bool match_step_keywords(Token* token, const Keywords* step_keywords) {
    int i;
    for (i = 0; i < step_keywords->count; ++i) {
        if (GherkinLine_start_with(token->line, step_keywords->keywords[i])) {
            wchar_t* title = GherkinLine_copy_rest_trimmed(token->line, wcslen(step_keywords->keywords[i]));
            set_token_matched(token, Token_StepLine, title, step_keywords->keywords[i], -1, 0);
            return true;
        }
    }
    return false;
}

static void set_token_matched(Token* token, TokenType matched_type, const wchar_t* text, const wchar_t* keyword, int indent, const Items* cells) {
    token->matched_type = matched_type;
    if (token->matched_text) {
        free((void*)token->matched_text);
    }
    token->matched_text = text;
    token->matched_keyword = keyword;
    if (indent != -1)
        token->location.column = indent + 1;
    else if (token && token->line)
        token->location.column = token->line->indent + 1;
    if (token->matched_items) {
        Token_delete_matched_items(token->matched_items);
    }
    token->matched_items = cells;
}

static void change_dialect(TokenMatcher* token_matcher, const wchar_t* language, Location* location) {
    const Dialect* new_dialect = Dialect_for(language);
    if (!new_dialect) {
        ErrorList_add_no_such_language_error(token_matcher->errors, location, language);
    }
    token_matcher->dialect = new_dialect;
    token_matcher->language = token_matcher->dialect->language_name;
}

static wchar_t* unescaped_docstring(TokenMatcher* token_matcher, wchar_t* text) {
    if (!token_matcher->active_doc_string_separator) {
        return text;
    }
    const wchar_t* from = text;
    wchar_t* to = text;
    while (*from != L'\0') {
        if (*from == L'\\' && wcsncmp(ESCAPED_DOC_STRING_SEPARATOR, from, wcslen(ESCAPED_DOC_STRING_SEPARATOR)) == 0) {
            int i;
            for (i = 0; i < 3; ++i) {
                from++;
                *to++ = *from++;
            }
        } else {
            *to++ = *from++;
        }
    }
    *to = L'\0';
    return text;
}
