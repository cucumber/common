#ifndef GHERKIN_SCENARIO_DEFINITION_H_
#define GHERKIN_SCENARIO_DEFINITION_H_

#include "ast.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct ScenarioDefinition {
    item_delete_function item_delete;
    GherkinAstType type;
} ScenarioDefinition;

typedef struct ScenarioDefinitions {
    int scenario_definition_count;
    ScenarioDefinition** scenario_definitions;
} ScenarioDefinitions;

void ScenarioDefinitions_delete(ScenarioDefinitions const*);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_SCENARIO_DEFINITION_H_ */
