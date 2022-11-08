#ifndef GHERKIN_PICKLE_STRING_H_
#define GHERKIN_PICKLE_STRING_H_

#include <wchar.h>

#include "pickle_argument.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct PickleString {
    PickleArgumentType type;
    wchar_t* media_type;
    wchar_t* content;
} PickleString;

const PickleString* PickleString_new(const wchar_t* content, const wchar_t* media_type);

void PickleString_delete(const PickleString* pickle_string);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_STRING_H_ */
