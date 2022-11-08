#ifndef GHERKIN_PARSER_H_
#define GHERKIN_PARSER_H_

#include "builder.h"
#include "error.h"
#include "token_matcher.h"
#include "token_scanner.h"
#include <stdbool.h>
#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Parser Parser;

Parser* Parser_new(Builder* builder);

void Parser_delete(Parser* parser);

int Parser_parse(Parser* parser, TokenMatcher* token_matcher, TokenScanner* token_scanner);

bool Parser_has_more_errors(Parser* parser);

Error* Parser_next_error(Parser* parser);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PARSER_H_ */
