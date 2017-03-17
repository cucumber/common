#include "scenario_outline.h"
#include "string_utilities.h"
#include <stdlib.h>

const ScenarioOutline* ScenarioOutline_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Tags* tags, const Steps* steps, const Examples* examples) {
    ScenarioOutline* scenario_outline = (ScenarioOutline*)malloc(sizeof(ScenarioOutline));
    scenario_outline->scenario_outline_delete = (item_delete_function)ScenarioOutline_delete;
    scenario_outline->type = Gherkin_ScenarioOutline;
    scenario_outline->location.line = location.line;
    scenario_outline->location.column = location.column;
    scenario_outline->keyword = 0;
    if (keyword) {
        scenario_outline->keyword = StringUtilities_copy_string(keyword);
    }
    scenario_outline->name = 0;
    if (name) {
        scenario_outline->name = StringUtilities_copy_string(name);
    }
    scenario_outline->description = description;
    scenario_outline->tags = tags;
    scenario_outline->steps = steps;
    scenario_outline->examples = examples;
    return scenario_outline;
}

void ScenarioOutline_delete(const ScenarioOutline* scenario_outline) {
    if (!scenario_outline) {
        return;
    }
    if (scenario_outline->keyword) {
        free((void*)scenario_outline->keyword);
    }
    if (scenario_outline->name) {
        free((void*)scenario_outline->name);
    }
    if (scenario_outline->description) {
        free((void*)scenario_outline->description);
    }
    if (scenario_outline->tags) {
        Tags_delete(scenario_outline->tags);
    }
    if (scenario_outline->steps) {
        Steps_delete(scenario_outline->steps);
    }
    if (scenario_outline->examples) {
        Examples_delete(scenario_outline->examples);
    }
    free((void*)scenario_outline);
}

void ScenarioOutline_transfer(ScenarioOutline* to_scenario_outline, ScenarioOutline* from_scenario_outline) {
    to_scenario_outline->type = from_scenario_outline->type;
    to_scenario_outline->location.line = from_scenario_outline->location.line;
    to_scenario_outline->location.column = from_scenario_outline->location.column;
    to_scenario_outline->keyword = from_scenario_outline->keyword;
    from_scenario_outline->keyword = 0;
    to_scenario_outline->name = from_scenario_outline->name;
    from_scenario_outline->name = 0;
    to_scenario_outline->description = from_scenario_outline->description;
    from_scenario_outline->description = 0;
    to_scenario_outline->tags = from_scenario_outline->tags;
    from_scenario_outline->tags = 0;
    to_scenario_outline->steps = from_scenario_outline->steps;
    from_scenario_outline->steps = 0;
    to_scenario_outline->examples = from_scenario_outline->examples;
    from_scenario_outline->examples = 0;
    ScenarioOutline_delete(from_scenario_outline);
}
