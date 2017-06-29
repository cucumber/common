#ifndef GHERKIN_TOKEN_SCANNER_H_
#define GHERKIN_TOKEN_SCANNER_H_

#include <wchar.h>

#include "token.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct TokenScanner TokenScanner;

typedef Token* (*read_function) (TokenScanner*);

typedef void (*delete_function) (TokenScanner*);

struct TokenScanner {
    read_function read;
    delete_function delete;
};

void TokenScanner_delete(TokenScanner* token_scanner);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_TOKEN_SCANNER_H_ */
