#ifndef GHERKIN_TOKEN_QUEUE_H_
#define GHERKIN_TOKEN_QUEUE_H_

#include <stdbool.h>
#include "token.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct TokenQueue TokenQueue;

TokenQueue* TokenQueue_new();

void TokenQueue_delete(TokenQueue* token_queue);

bool TokenQueue_is_empty(TokenQueue* token_queue);

void TokenQueue_add(TokenQueue* token_queue, Token* token);

Token* TokenQueue_remove(TokenQueue* token_queue);

void TokenQueue_extend(TokenQueue* token_queue, TokenQueue* other_queue);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_TOKEN_QUEUE_H_ */
