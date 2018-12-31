#include "token_formatter_builder.h"
#include "print_utilities.h"
#include <stdio.h>
#include <stdlib.h>

typedef struct TokenFormatterBuilder {
    Builder builder;
    FILE* file;
} TokenFormatterBuilder;

void TokenFormatterBuilder_build(Builder* builder, Token* token);

void TokenFormatterBuilder_reset(Builder* builder);

void TokenFormatterBuilder_set_error_context(Builder* builder, ErrorList* error_context);

void TokenFormatterBuilder_start_rule(Builder* builder, RuleType rule);

void TokenFormatterBuilder_end_rule(Builder* builder, RuleType rule);

static const char* token_type_to_string(TokenType token_type);

Builder* TokenFormatterBuilder_new() {
    TokenFormatterBuilder* builder = (TokenFormatterBuilder*)malloc(sizeof(TokenFormatterBuilder));
    builder->builder.build = &TokenFormatterBuilder_build;
    builder->builder.reset = &TokenFormatterBuilder_reset;
    builder->builder.set_error_context = &TokenFormatterBuilder_set_error_context;
    builder->builder.start_rule = &TokenFormatterBuilder_start_rule;
    builder->builder.end_rule = &TokenFormatterBuilder_end_rule;
    builder->file = stdout; /*fopen("output.txt", "w");*/
    return (Builder*)builder;
}

void TokenFormatterBuilder_delete(Builder* builder) {
    /*fclose(((TokenFormatterBuilder*)builder)->file);*/
    free((void*)builder);
}

void TokenFormatterBuilder_build(Builder* builder, Token* token) {
    if (token->matched_type == Token_EOF)
        fprintf(((TokenFormatterBuilder*)builder)->file, "%s\n", token_type_to_string(token->matched_type));
    else if (token->matched_type == Token_TableRow || token->matched_type == Token_TagLine) {
        fprintf(((TokenFormatterBuilder*)builder)->file,
                "(%d:%d)%s:",
                token->location.line,
                token->location.column,
                token_type_to_string(token->matched_type));
        PrintUtilities_print_wide_string(((TokenFormatterBuilder*)builder)->file,
                                   token->matched_keyword ? token->matched_keyword : L"");
        fprintf(((TokenFormatterBuilder*)builder)->file, "/");
        PrintUtilities_print_wide_string(((TokenFormatterBuilder*)builder)->file,
                                   token->matched_text ? token->matched_text : L"");
        fprintf(((TokenFormatterBuilder*)builder)->file, "/");
        int i;
        for (i = 0; i < token->matched_items->count; ++i) {
            if (i != 0)
                fprintf(((TokenFormatterBuilder*)builder)->file, ",");
            fprintf(((TokenFormatterBuilder*)builder)->file,
                    "%d:",
                    token->matched_items->items[i].column);
            PrintUtilities_print_wide_string(((TokenFormatterBuilder*)builder)->file,
                                       token->matched_items->items[i].text);
        }
        fprintf(((TokenFormatterBuilder*)builder)->file, "\n");
    }
    else {
        fprintf(((TokenFormatterBuilder*)builder)->file,
                "(%d:%d)%s:",
                token->location.line,
                token->location.column,
                token_type_to_string(token->matched_type));
        PrintUtilities_print_wide_string(((TokenFormatterBuilder*)builder)->file,
                                   token->matched_keyword ? token->matched_keyword : L"");
        fprintf(((TokenFormatterBuilder*)builder)->file, "/");
        PrintUtilities_print_wide_string(((TokenFormatterBuilder*)builder)->file,
                                   token->matched_text ? token->matched_text : L"");
        fprintf(((TokenFormatterBuilder*)builder)->file, "/\n");
    }
    Token_delete(token);
}

void TokenFormatterBuilder_reset(Builder* builder) {
}

void TokenFormatterBuilder_set_error_context(Builder* builder, ErrorList* error_context) {
}

void TokenFormatterBuilder_start_rule(Builder* builder, RuleType rule) {
}

void TokenFormatterBuilder_end_rule(Builder* builder, RuleType rule) {
}

const char* token_type_to_string(TokenType token_type) {
    switch (token_type) {
    case Token_None:
        return "None";
    case Token_Empty:
        return "Empty";
    case Token_FeatureLine:
        return "FeatureLine";
    case Token_ScenarioLine:
        return "ScenarioLine";
    case Token_ExamplesLine:
        return "ExamplesLine";
    case Token_BackgroundLine:
        return "BackgroundLine";
    case Token_StepLine:
        return "StepLine";
    case Token_TableRow:
        return "TableRow";
    case Token_TagLine:
        return "TagLine";
    case Token_Language:
        return "Language";
    case Token_RuleLine:
        return "RuleLine";
    case Token_Comment:
        return "Comment";
    case Token_DocStringSeparator:
        return "DocStringSeparator";
    case Token_Other:
        return "Other";
    case Token_EOF:
        return "EOF";
    }
    return "";
}
