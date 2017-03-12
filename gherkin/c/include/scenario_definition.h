#ifndef GHERKIN_SCENARIO_DEFINITION_H_
#define GHERKIN_SCENARIO_DEFINITION_H_

#include "ast.h"
#include "step.h"

typedef struct ScenarioDefinition {
    item_delete_function item_delete;
    GherkinAstType type;
} ScenarioDefinition;

typedef struct ScenarioDefinitions {
    int scenario_definition_count;
    ScenarioDefinition** scenario_definitions;
} ScenarioDefinitions;

#endif /* GHERKIN_SCENARIO_DEFINITION_H_ */
