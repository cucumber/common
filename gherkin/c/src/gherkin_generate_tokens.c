#include <locale.h>
#include <stdlib.h>
#include "file_reader.h"
#include "file_token_scanner.h"
#include "token_matcher.h"
#include "parser.h"
#include "token_formatter_builder.h"

int main(int argc, char** argv) {
    setlocale(LC_ALL, "en_US.UTF-8");
    int i;
    for (i = 1; i < argc; ++i) {
        TokenScanner* token_scanner = FileTokenScanner_new(argv[i]);
        TokenMatcher* token_matcher = TokenMatcher_new(L"en");
        Builder* builder = TokenFormatterBuilder_new();
        Parser* parser = Parser_new(builder);
        Parser_parse(parser, token_matcher, token_scanner);
        Parser_delete(parser);
        TokenFormatterBuilder_delete(builder);
        TokenMatcher_delete(token_matcher);
        TokenScanner_delete(token_scanner);
    }
    return 0;
}
