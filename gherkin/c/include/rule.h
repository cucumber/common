#ifndef GHERKIN_RULE_H_
#define GHERKIN_RULE_H_

#include "ast.h"
#include "scenario_definition.h"
#include "location.h"

#ifdef __cplusplus
#include <cstddef>
#else
#include <stddef.h>
#endif

#ifdef __cplusplus
extern "C" {
#endif


typedef struct Rule {
    item_delete_function rule_delete;
    GherkinAstType type;
    Location location;
    const wchar_t* keyword;
    const wchar_t* name;
    const wchar_t* description;
    const ScenarioDefinitions* scenario_definitions;
} Rule;

typedef struct Rules {
    int rule_count;
    Rule** rules;
} Rules;

Rule const* Rule_new(Location location, wchar_t const* keyword, wchar_t const* name, wchar_t const* description, ScenarioDefinitions const* scenario_definitions);

void Rule_delete(Rule const*);
void Rules_delete(Rules const*);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_RULE_H_ */
