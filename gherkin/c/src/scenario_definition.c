#include "scenario_definition.h"

#include "background.h"
#include "scenario.h"

#ifdef __cplusplus
#include <cstdlib>
#else
#include <stdlib.h>
#endif

void ScenarioDefinitions_delete(ScenarioDefinitions const* scenario_definitions)
{
    ScenarioDefinition* scenario_definition;
    if (scenario_definitions->scenario_definition_count > 0) {
        int i;
        for(i = 0; i < scenario_definitions->scenario_definition_count; ++i) {
            scenario_definition = scenario_definitions->scenario_definitions[i];
            if (scenario_definition->type == Gherkin_Background) {
                Background_delete((Background*)scenario_definition);
            }
            else if (scenario_definition->type == Gherkin_Scenario) {
                Scenario_delete((Scenario*)scenario_definition);
            }
            else if (scenario_definition->type == Gherkin_Scenario) {
                Scenario_delete((Scenario*)scenario_definition);
            }
        }
        free((void*)scenario_definitions->scenario_definitions);
    }
    free((void*)scenario_definitions);
}
