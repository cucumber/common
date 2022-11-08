#include "string_token_scanner.h"
#include "gherkin_line.h"
#include "string_utilities.h"
#include <stdlib.h>

typedef struct StringTokenScanner {
    TokenScanner token_scanner;
    const wchar_t* source;
    int line;
    int pos;
} StringTokenScanner;

static Token* StringTokenScanner_read(TokenScanner* token_scanner);

static void StringTokenScanner_delete(TokenScanner* token_scanner);

TokenScanner* StringTokenScanner_new(const wchar_t* source) {
    StringTokenScanner* token_scanner = (StringTokenScanner*)malloc(sizeof(StringTokenScanner));
    token_scanner->token_scanner.read = &StringTokenScanner_read;
    token_scanner->token_scanner.del = &StringTokenScanner_delete;
    token_scanner->source = source;
    token_scanner->line = 0;
    token_scanner->pos = 0;
    return (TokenScanner*) token_scanner;
}

static Token* StringTokenScanner_read(TokenScanner* token_scanner) {
    StringTokenScanner* string_token_scanner = (StringTokenScanner*)token_scanner;
    ++string_token_scanner->line;
    if (!string_token_scanner->source)
        return Token_new(0, string_token_scanner->line);
    if (string_token_scanner->source[string_token_scanner->pos] == L'\0')
        return Token_new(0, string_token_scanner->line);
    int length = 0;
    wchar_t c;
    do {
        c = string_token_scanner->source[string_token_scanner->pos + length++];
    } while (c != L'\0' && c != L'\n' && c != L'\r');
    const GherkinLine* line;
    if (c != L'\0' || length > 1) {
        wchar_t* text = StringUtilities_copy_string_part(string_token_scanner->source + string_token_scanner->pos, length - 1);
        string_token_scanner->pos += length;
        line = GherkinLine_new(text, string_token_scanner->line);
    }
    else
        line = (GherkinLine*)0;
    if (c == L'\r' && string_token_scanner->source[string_token_scanner->pos] == L'\n') {
        string_token_scanner->pos++;
    }
    if (c == L'\0') {
        string_token_scanner->pos--;
    }
    return Token_new(line, string_token_scanner->line);
}

static void StringTokenScanner_delete(TokenScanner* token_scanner) {
    if (!token_scanner) {
        return;
    }
    StringTokenScanner* string_token_scanner = (StringTokenScanner*)token_scanner;
    free((void*)string_token_scanner);
}
