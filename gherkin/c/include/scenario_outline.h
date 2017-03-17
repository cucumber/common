#ifndef GHERKIN_SCENARIO_OUTLINE_H_
#define GHERKIN_SCENARIO_OUTLINE_H_

#include <wchar.h>

#include "ast.h"
#include "example_table.h"
#include "location.h"
#include "tag.h"
#include "scenario_definition.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct ScenarioOutline {
    item_delete_function scenario_outline_delete;
    GherkinAstType type;
    Location location;
    wchar_t* keyword;
    wchar_t* name;
    const wchar_t* description;
    const Tags* tags;
    const Steps* steps;
    const Examples* examples;
} ScenarioOutline;

const ScenarioOutline* ScenarioOutline_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Tags* tags, const Steps* steps, const Examples* examples);

void ScenarioOutline_delete(const ScenarioOutline* scenario_outline);

void ScenarioOutline_transfer(ScenarioOutline* to_scenario_outline, ScenarioOutline* from_scenario_outline);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_SCENARIO_OUTLINE_H_ */
