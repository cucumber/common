#ifndef GHERKIN_RULE_H_
#define GHERKIN_RULE_H_

#include <wchar.h>

#include "ast.h"
#include "location.h"
#include "child_definition.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Rule {
    item_delete_function rule_delete;
    GherkinAstType type;
    Location location;
    wchar_t* keyword;
    wchar_t* name;
    const wchar_t* description;
    const ChildDefinitions* child_definitions;
} Rule;

const Rule* Rule_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const ChildDefinitions* child_definitions);

void Rule_delete(const Rule* rule);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_RULE_H_ */
