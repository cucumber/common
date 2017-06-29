#ifndef GHERKIN_FEATURE_H_
#define GHERKIN_FEATURE_H_

#include <wchar.h>

#include "ast.h"
#include "location.h"
#include "tag.h"
#include "background.h"
#include "scenario_definition.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Feature {
    item_delete_function feature_delete;
    GherkinAstType type;
    Location location;
    wchar_t* language;
    wchar_t* keyword;
    wchar_t* name;
    const wchar_t* description;
    const Tags* tags;
    const ScenarioDefinitions* scenario_definitions;
} Feature;

const Feature* Feature_new(Location location, const wchar_t* language, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Tags* tags, const ScenarioDefinitions* scenario_definitions);

void Feature_delete(const Feature* feature);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_FEATURE_H_ */
