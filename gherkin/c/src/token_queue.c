#include "token_queue.h"
#include "item_queue.h"
#include <stdlib.h>

typedef struct QueueItem QueueItem;

TokenQueue* TokenQueue_new() {
    return (TokenQueue*)ItemQueue_new();
}

void TokenQueue_delete(TokenQueue* token_queue) {
    ItemQueue_delete((ItemQueue*)token_queue);
}

bool TokenQueue_is_empty(TokenQueue* token_queue) {
    return ItemQueue_is_empty((ItemQueue*)token_queue);
}

void TokenQueue_add(TokenQueue* token_queue, Token* token) {
    ItemQueue_add((ItemQueue*)token_queue, (void*)token);
}

Token* TokenQueue_remove(TokenQueue* token_queue) {
    return (Token*)ItemQueue_remove((ItemQueue*)token_queue);
}

void TokenQueue_extend(TokenQueue* token_queue, TokenQueue* other_queue) {
    ItemQueue_extend((ItemQueue*)token_queue, (ItemQueue*)other_queue);
}
