#ifndef GHERKIN_SCENARIO_H_
#define GHERKIN_SCENARIO_H_

#include <wchar.h>

#include "ast.h"
#include "child_definition.h"
#include "example_table.h"
#include "location.h"
#include "tag.h"
#include "step.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Scenario {
    item_delete_function scenario_delete;
    GherkinAstType type;
    Location location;
    wchar_t* keyword;
    wchar_t* name;
    const wchar_t* description;
    const Tags* tags;
    const Steps* steps;
    const Examples* examples;
} Scenario;

const Scenario* Scenario_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Tags* tags, const Steps* steps, const Examples* examples);

void Scenario_delete(const Scenario* scenario);

void Scenario_transfer(Scenario* to_scenario, Scenario* from_scenario);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_SCENARIO_H_ */
