#include "scenario.h"
#include "string_utilities.h"
#include <stdlib.h>

const Scenario* Scenario_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Tags* tags, const Steps* steps, const Examples* examples) {
    Scenario* scenario = (Scenario*)malloc(sizeof(Scenario));
    scenario->scenario_delete = (item_delete_function)Scenario_delete;
    scenario->type = Gherkin_Scenario;
    scenario->location.line = location.line;
    scenario->location.column = location.column;
    scenario->keyword = 0;
    if (keyword) {
        scenario->keyword = StringUtilities_copy_string(keyword);
    }
    scenario->name = 0;
    if (name) {
        scenario->name = StringUtilities_copy_string(name);
    }
    scenario->description = description;
    scenario->tags = tags;
    scenario->steps = steps;
    scenario->examples = examples;
    return scenario;
}

void Scenario_delete(const Scenario* scenario) {
    if (!scenario) {
        return;
    }
    if (scenario->keyword) {
        free((void*)scenario->keyword);
    }
    if (scenario->name) {
        free((void*)scenario->name);
    }
    if (scenario->description) {
        free((void*)scenario->description);
    }
    if (scenario->tags) {
        Tags_delete(scenario->tags);
    }
    if (scenario->steps) {
        Steps_delete(scenario->steps);
    }
    if (scenario->examples) {
        Examples_delete(scenario->examples);
    }
    free((void*)scenario);
}

void Scenario_transfer(Scenario* to_scenario, Scenario* from_scenario) {
    to_scenario->type = from_scenario->type;
    to_scenario->location.line = from_scenario->location.line;
    to_scenario->location.column = from_scenario->location.column;
    to_scenario->keyword = from_scenario->keyword;
    from_scenario->keyword = 0;
    to_scenario->name = from_scenario->name;
    from_scenario->name = 0;
    to_scenario->description = from_scenario->description;
    from_scenario->description = 0;
    to_scenario->tags = from_scenario->tags;
    from_scenario->tags = 0;
    to_scenario->steps = from_scenario->steps;
    from_scenario->steps = 0;
    to_scenario->examples = from_scenario->examples;
    from_scenario->examples = 0;
    Scenario_delete(from_scenario);
}
