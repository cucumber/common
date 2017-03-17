#include "error_list.h"
#include "error.h"
#include "item_queue.h"
#include "token.h"
#include <stdlib.h>
#include <setjmp.h>

typedef struct ErrorList {
    ItemQueue* errors;
    QueueItem* current_error;
    jmp_buf* global_env;
    jmp_buf* local_env;
} ErrorList;

ErrorList* ErrorList_new() {
    ErrorList* error_list = (ErrorList*)malloc(sizeof(ErrorList));
    error_list->errors = ItemQueue_new();
    error_list->current_error = 0;
    error_list->global_env = 0;
    error_list->local_env = 0;
    return error_list;
}

void ErrorList_delete(ErrorList* error_list) {
    ItemQueue_delete(error_list->errors);
    free((void*)error_list);
}

void ErrorList_set_global_rescue_env(ErrorList* error_list, jmp_buf* env) {
    error_list->global_env = env;
}

void ErrorList_set_local_rescue_env(ErrorList* error_list, jmp_buf* env) {
    error_list->local_env = env;
}

void ErrorList_jump_to_global_rescue_env(ErrorList* error_list) {
    if (error_list->global_env) {
        longjmp(*error_list->global_env, 1);
    }
}

void ErrorList_jump_to_local_rescue_env(ErrorList* error_list) {
    if (error_list->local_env) {
        longjmp(*error_list->local_env, 1);
    }
    ErrorList_jump_to_global_rescue_env(error_list);
}

bool ErrorList_is_empty(ErrorList* error_list) {
    return ItemQueue_is_empty(error_list->errors);
}

Error* ErrorList_remove(ErrorList* error_list) {
    return (Error*)ItemQueue_remove(error_list->errors);
}

void ErrorList_add(ErrorList* error_list, const wchar_t* error_text, const Location location) {
    ItemQueue_add(error_list->errors, (Item*)Error_new(error_text, location));
    if (ItemQueue_size(error_list->errors) > 10) {
        ErrorList_jump_to_global_rescue_env(error_list);
    }
}

void ErrorList_add_unexpected_eof_error(ErrorList* error_list, Token* received_token, const wchar_t* expected_tokens) {
    const wchar_t* const message = L"unexpected end of file, expected: %ls";
    const int location_text_width = 11; // enough space for "(xxx:yyy): " to fit
    const int message_length = wcslen(message) - 3 + wcslen(expected_tokens);
    wchar_t* text = (wchar_t*)malloc((location_text_width + message_length + 1) * sizeof(wchar_t*));
    int actual_location_width = swprintf(text, location_text_width + message_length + 1, L"(%d:%d): ", received_token->location.line, received_token->location.column);
    if (actual_location_width > location_text_width) {
        text = (wchar_t*)realloc(text, (actual_location_width + message_length + 1) * sizeof(wchar_t*));
    }
    swprintf(text + actual_location_width, message_length + 1, message, expected_tokens);
    ErrorList_add(error_list, text, received_token->location);
}

void ErrorList_add_unexpected_token_error(ErrorList* error_list, Token* received_token, const wchar_t* expected_tokens) {
    const wchar_t* const message = L"expected: %ls, got '%ls'";
    const int location_text_width = 11; // enough space for "(xxx:yyy): " to fit
    const int message_length = wcslen(message) - 6 + wcslen(expected_tokens) + wcslen(received_token->line->trimmed_line);
    wchar_t* text = (wchar_t*)malloc((location_text_width + message_length + 1) * sizeof(wchar_t*));
    int column = received_token->location.column;
    if (column == 0) {
        column = received_token->line->indent + 1;
    }
    int actual_location_width = swprintf(text, location_text_width + message_length + 1, L"(%d:%d): ", received_token->location.line, column);
    if (actual_location_width > location_text_width) {
        text = (wchar_t*)realloc(text, (actual_location_width + message_length + 1) * sizeof(wchar_t*));
    }
    swprintf(text + actual_location_width, message_length + 1, message, expected_tokens, received_token->line->trimmed_line);
    Location location = {received_token->location.line, column};
    ErrorList_add(error_list, text, location);
}

void ErrorList_add_no_such_language_error(ErrorList* error_list, Location* location, const wchar_t* language) {
    const wchar_t* const message = L"Language not supported: %ls";
    const int location_text_width = 11; // enough space for "(xxx:yyy): " to fit
    const int message_length = wcslen(message) - 3 + wcslen(language);
    wchar_t* text = (wchar_t*)malloc((location_text_width + message_length + 1) * sizeof(wchar_t*));
    int actual_location_width = swprintf(text, location_text_width + message_length + 1, L"(%d:%d): ", location->line, location->column);
    if (actual_location_width > location_text_width) {
        text = (wchar_t*)realloc(text, (actual_location_width + message_length + 1) * sizeof(wchar_t*));
    }
    swprintf(text + actual_location_width, message_length + 1, message, language);
    ErrorList_add(error_list, text, *location);
    ErrorList_jump_to_local_rescue_env(error_list);
}

void ErrorList_add_inconsisten_cell_count_error(ErrorList* error_list, Location location) {
    const wchar_t* const message = L"inconsistent cell count within the table";
    const int location_text_width = 11; // enough space for "(xxx:yyy): " to fit
    const int message_length = wcslen(message);
    wchar_t* text = (wchar_t*)malloc((location_text_width + message_length + 1) * sizeof(wchar_t*));
    int actual_location_width = swprintf(text, location_text_width + message_length + 1, L"(%d:%d): ", location.line, location.column);
    if (actual_location_width > location_text_width) {
        text = (wchar_t*)realloc(text, (actual_location_width + message_length + 1) * sizeof(wchar_t*));
    }
    wcscpy(text + actual_location_width, message);
    ErrorList_add(error_list, text, location);
    ErrorList_jump_to_local_rescue_env(error_list);
}

void ErrorList_internal_grammar_error(ErrorList* error_list) {
    const wchar_t* const message = L"Internal grammar error";
    const int message_length = wcslen(message);
    wchar_t* text = (wchar_t*)malloc((message_length + 1) * sizeof(wchar_t*));
    wcscpy(text, message);
    Location location = {-1, -1};
    ErrorList_add(error_list, text, location);
    ErrorList_jump_to_local_rescue_env(error_list);
}

void ErrorList_add_invalid_operation_error(ErrorList* error_list, int state) {
    const wchar_t* const message = L"Unknown state: %d";
    const int message_length = wcslen(message) + 10; // some extra space for the state number
    wchar_t* text = (wchar_t*)malloc((message_length + 1) * sizeof(wchar_t*));
    swprintf(text, message_length + 1, message, state);
    Location location = {-1, -1};
    ErrorList_add(error_list, text, location);
}

bool ErrorList_has_more_errors(ErrorList* error_list) {
    return !ErrorList_is_empty(error_list);
}

Error* ErrorList_next_error(ErrorList* error_list) {
    if (!ErrorList_has_more_errors(error_list)) {
        return (Error*)0;
    }
    return ErrorList_remove(error_list);
}
