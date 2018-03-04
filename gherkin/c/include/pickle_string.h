#ifndef GHERKIN_PICKLE_STRING_H_
#define GHERKIN_PICKLE_STRING_H_

#include <wchar.h>

#include "pickle_argument.h"
#include "pickle_location.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct PickleString {
    PickleArgumentType type;
    PickleLocation location;
    wchar_t* content_type;
    wchar_t* content;
} PickleString;

const PickleString* PickleString_new(const wchar_t* content, int line, int column, const wchar_t* content_type);

void PickleString_delete(const PickleString* pickle_string);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_STRING_H_ */
