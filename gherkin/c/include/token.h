#ifndef GHERKIN_TOKEN_H_
#define GHERKIN_TOKEN_H_

#include <wchar.h>
#include "item.h"
#include "location.h"
#include "gherkin_line.h"
#include "rule_type.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum TokenType {
    Token_None = Rule_None,
    Token_Empty = Rule_Empty,
    Token_FeatureLine = Rule_FeatureLine,
    Token_ScenarioLine = Rule_ScenarioLine,
    Token_ScenarioOutlineLine = Rule_ScenarioOutlineLine,
    Token_ExamplesLine = Rule_ExamplesLine,
    Token_BackgroundLine = Rule_BackgroundLine,
    Token_StepLine = Rule_StepLine,
    Token_TableRow = Rule_TableRow,
    Token_TagLine = Rule_TagLine,
    Token_Language = Rule_Language,
    Token_Comment = Rule_Comment,
    Token_DocStringSeparator = Rule_DocStringSeparator,
    Token_Other = Rule_Other,
    Token_EOF = Rule_EOF
} TokenType;

typedef struct Token {
    item_delete_function token_delete;
    const GherkinLine* line;
    Location location;
    TokenType matched_type;
    const wchar_t* matched_text;
    const wchar_t* matched_keyword;
    const Items* matched_items;
    const wchar_t* matched_language;
} Token;

Token* Token_new(const GherkinLine* gherkin_line, int line);

void Token_delete(Token* token);

void Token_delete_matched_items(const Items* items);

bool Token_is_eof(Token* token);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_TOKEN_H_ */
