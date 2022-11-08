#ifndef GHERKIN_ERROR_H_
#define GHERKIN_ERROR_H_

#include "item.h"
#include "location.h"
#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Error {
    item_delete_function error_delete;
    Location location;
    const wchar_t* error_text;
} Error;

const Error* Error_new(const wchar_t* error_text, const Location location);

void Error_delete(const Error* error);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_ERROR_H_ */
