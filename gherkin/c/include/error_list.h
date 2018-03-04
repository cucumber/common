#ifndef GHERKIN_ERROR_LIST_H_
#define GHERKIN_ERROR_LIST_H_

#include "error.h"
#include "token.h"
#include <stdbool.h>
#include <setjmp.h>
#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct ErrorList ErrorList;

ErrorList* ErrorList_new();

void ErrorList_delete(ErrorList* error_list);

void ErrorList_set_global_rescue_env(ErrorList* error_list, jmp_buf* env);

void ErrorList_set_local_rescue_env(ErrorList* error_list, jmp_buf* env);

void ErrorList_jump_to_global_rescue_env(ErrorList* error_list);

void ErrorList_jump_to_local_rescue_env(ErrorList* error_list);

bool ErrorList_is_empty(ErrorList* error_list);

void ErrorList_add(ErrorList* error_list, const wchar_t* error, const Location location);

void ErrorList_add_unexpected_eof_error(ErrorList* error_list, Token* received_token, const wchar_t* expected_tokens);

void ErrorList_add_unexpected_token_error(ErrorList* error_list, Token* received_token, const wchar_t* expected_tokens);

void ErrorList_add_no_such_language_error(ErrorList* error_list, Location* location, const wchar_t* language);

void ErrorList_add_inconsisten_cell_count_error(ErrorList* error_list, Location location);

void ErrorList_internal_grammar_error(ErrorList* error_list);

void ErrorList_add_invalid_operation_error(ErrorList* error_list, int state);

bool ErrorList_has_more_errors(ErrorList* error_list);

Error* ErrorList_next_error(ErrorList* error_list);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_ERROR_LIST_H_ */
