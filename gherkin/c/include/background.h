#ifndef GHERKIN_BACKGROUND_H_
#define GHERKIN_BACKGROUND_H_

#include <wchar.h>

#include "ast.h"
#include "location.h"
#include "step.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Background {
    item_delete_function background_delete;
    GherkinAstType type;
    Location location;
    wchar_t* keyword;
    wchar_t* name;
    const wchar_t* description;
    const Steps* steps;
} Background;

const Background* Background_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Steps* steps);

void Background_delete(const Background* background);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_BACKGROUND_H_ */
