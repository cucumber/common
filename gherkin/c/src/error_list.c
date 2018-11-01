#include "error_list.h"
#include "error.h"
#include "item_queue.h"
#include "token.h"
#include <math.h>
#include <stdlib.h>
#include <setjmp.h>

struct ErrorList {
    ItemQueue* errors;
    QueueItem* current_error;
    jmp_buf* global_env;
    jmp_buf* local_env;
};

static int calculate_string_length_for_location(int line_width, int column_width);

static int print_location_to_string(wchar_t* string, int pos, int line, int line_width, int column, int column_width);

static int calculate_string_length_for_number(int number);

static int print_number_to_string(wchar_t* string, int pos, int number, int number_width);

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
}

void ErrorList_add_unexpected_eof_error(ErrorList* error_list, Token* received_token, const wchar_t* expected_tokens) {
    const wchar_t* const message = L"unexpected end of file, expected: ";
    const int message_length = wcslen(message);
    const int line_width = calculate_string_length_for_number(received_token->location.line);
    const int column_width = calculate_string_length_for_number(received_token->location.column);
    const int total_length = calculate_string_length_for_location(line_width, column_width) + message_length + wcslen(expected_tokens);
    wchar_t* text = (wchar_t*)malloc((total_length + 1) * sizeof(wchar_t*));
    int pos = 0;
    pos = print_location_to_string(text, pos, received_token->location.line, line_width, received_token->location.column, column_width);
    wcscpy(text + pos, message);
    pos += message_length;
    wcscpy(text + pos, expected_tokens);
    text[total_length] = L'\0';
    ErrorList_add(error_list, text, received_token->location);
}

void ErrorList_add_unexpected_token_error(ErrorList* error_list, Token* received_token, const wchar_t* expected_tokens) {
    const wchar_t* const expected = L"expected: ";
    const int expected_length = wcslen(expected);
    const wchar_t* const got = L", got ";
    const int got_length = wcslen(got);
    const int expected_tokens_length = wcslen(expected_tokens);
    const int received_tokens_length = wcslen(received_token->line->trimmed_line);
    const int line_width = calculate_string_length_for_number(received_token->location.line);
    const int column_width = calculate_string_length_for_number(received_token->location.column);
    const int total_length = calculate_string_length_for_location(line_width, column_width) + expected_length + expected_tokens_length + got_length + received_tokens_length + 2;
    wchar_t* text = (wchar_t*)malloc((total_length + 1) * sizeof(wchar_t*));
    int column = received_token->location.column;
    if (column == 0) {
        column = received_token->line->indent + 1;
    }
    int pos = 0;
    pos = print_location_to_string(text, pos, received_token->location.line, line_width, column, column_width);
    wcscpy(text + pos, expected);
    pos += expected_length;
    wcscpy(text + pos, expected_tokens);
    pos += expected_tokens_length;
    wcscpy(text + pos, got);
    pos += got_length;
    text[pos++] = L'\'';
    wcscpy(text + pos, received_token->line->trimmed_line);
    pos += received_tokens_length;
    text[pos++] = L'\'';
    text[total_length] = L'\0';
    Location location = {received_token->location.line, column};
    ErrorList_add(error_list, text, location);
}

void ErrorList_add_no_such_language_error(ErrorList* error_list, Location* location, const wchar_t* language) {
    const wchar_t* const message = L"Language not supported: ";
    const int message_length = wcslen(message);
    const int language_length = wcslen(language);
    Location used_location = {-1, -1};
    if (location) {
        used_location.line = location->line;
        used_location.column = location->column;
    }
    const int line_width = calculate_string_length_for_number(used_location.line);
    const int column_width = calculate_string_length_for_number(used_location.column);
    const int total_length = calculate_string_length_for_location(line_width, column_width) + message_length + language_length;
    wchar_t* text = (wchar_t*)malloc((total_length + 1) * sizeof(wchar_t*));
    int pos = 0;
    pos = print_location_to_string(text, pos, used_location.line, line_width, used_location.column, column_width);
    wcscpy(text + pos, message);
    pos += message_length;
    wcscpy(text + pos, language);
    text[total_length] = L'\0';
    ErrorList_add(error_list, text, used_location);
    ErrorList_jump_to_local_rescue_env(error_list);
}

void ErrorList_add_inconsisten_cell_count_error(ErrorList* error_list, Location location) {
    const wchar_t* const message = L"inconsistent cell count within the table";
    const int message_length = wcslen(message);
    const int line_width = calculate_string_length_for_number(location.line);
    const int column_width = calculate_string_length_for_number(location.column);
    const int total_length = calculate_string_length_for_location(line_width, column_width) + message_length;
    wchar_t* text = (wchar_t*)malloc((total_length + 1) * sizeof(wchar_t*));
    int pos = 0;
    pos = print_location_to_string(text, pos, location.line, line_width, location.column, column_width);
    wcscpy(text + pos, message);
    text[total_length] = L'\0';
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
    const wchar_t* const message = L"Unknown state: ";
    const int message_length = wcslen(message);
    const int state_width = calculate_string_length_for_number(state);
    const int total_length = message_length + state_width;
    wchar_t* text = (wchar_t*)malloc((total_length + 1) * sizeof(wchar_t*));
    int pos = 0;
    wcscpy(text + pos, message);
    pos += message_length;
    print_number_to_string(text, pos, state, state_width);
    text[total_length] = L'\0';
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

int calculate_string_length_for_location(int line_width, int column_width) {
    return line_width + column_width + 5; /* "(<line>:<column): " */
}

int print_location_to_string(wchar_t* string, int pos, int line, int line_width, int column, int column_width) {
    string[pos++] = L'(';
    pos = print_number_to_string(string, pos, line, line_width);
    string[pos++] = L':';
    pos = print_number_to_string(string, pos, column, column_width);
    string[pos++] = L')';
    string[pos++] = L':';
    string[pos++] = L' ';
    return pos;

}

int calculate_string_length_for_number(int number) {
    if (number == 0) {
        return 1;
    }
    return (int)log10(number) + 1;
}

int print_number_to_string(wchar_t* string, int pos, int number, int number_width) {
    int divisor = 1;
    int i;
    for (i = number_width - 1; i >= 0; --i) {
        string[pos + i] = L'0' + ((number / divisor) % 10);
        divisor *= 10;
    }
    return pos + number_width;
}
