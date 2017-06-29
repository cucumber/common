#ifndef GHERKIN_DOC_STRING_H_
#define GHERKIN_DOC_STRING_H_

#include <wchar.h>

#include "ast.h"
#include "location.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct DocString {
    item_delete_function doc_string_delete;
    GherkinAstType type;
    Location location;
    wchar_t* content_type;
    const wchar_t* content;
} DocString;

const DocString* DocString_new(Location location, const wchar_t* content_type, const wchar_t* content);

void DocString_delete(const DocString* doc_string);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_DOC_STRING_H_ */
