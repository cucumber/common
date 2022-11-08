#include "error.h"

#include <stdlib.h>

const Error* Error_new(const wchar_t* error_text, const Location location) {
    Error* error = (Error*)malloc(sizeof(Error));
    error->error_delete = (item_delete_function)Error_delete;
    error->location.line = location.line;
    error->location.column = location.column;
    error->error_text = error_text;
    return error;
}

void Error_delete(const Error* error) {
    if (error->error_text) {
        free((void*)error->error_text);
    }
    free((void*)error);
}
