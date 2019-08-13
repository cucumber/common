#include "rule.h"
#include "background.h"
#include "scenario.h"
#include "string_utilities.h"
#include <stdlib.h>

const Rule* Rule_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const ChildDefinitions* child_definitions) {
    Rule* rule = (Rule*)malloc(sizeof(Rule));
    rule->rule_delete = (item_delete_function)Rule_delete;
    rule->type = Gherkin_Rule;
    rule->location.line = location.line;
    rule->location.column = location.column;
    if (keyword) {
        rule->keyword = StringUtilities_copy_string(keyword);
    }
    if (name) {
        rule->name = StringUtilities_copy_string(name);
    }
    rule->description = description;
    rule->child_definitions = child_definitions;
    return rule;
}

void Rule_delete(const Rule* rule) {
    if (!rule) {
        return;
    }
    if (rule->keyword) {
        free((void*)rule->keyword);
    }
    if (rule->name) {
        free((void*)rule->name);
    }
    if (rule->description) {
        free((void*)rule->description);
    }
    if (rule->child_definitions) {
        ChildDefinition* scenario_definition;
        if (rule->child_definitions->child_definition_count > 0) {
            int i;
            for(i = 0; i < rule->child_definitions->child_definition_count; ++i) {
                scenario_definition = rule->child_definitions->child_definitions[i];
                if (scenario_definition->type == Gherkin_Background) {
                    Background_delete((Background*)scenario_definition);
                }
                else if (scenario_definition->type == Gherkin_Scenario) {
                    Scenario_delete((Scenario*)scenario_definition);
                }
            }
            free((void*)rule->child_definitions->child_definitions);
        }
        free((void*)rule->child_definitions);
    }
    free((void*)rule);
}
