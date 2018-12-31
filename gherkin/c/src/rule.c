#include "rule.h"

#include "string_utilities.h"

#ifdef __cpluplus
#include <cstdlib>
#else
#include <stdlib.h>
#endif


Rule const* Rule_new(Location location, wchar_t const* keyword, wchar_t const* name, wchar_t const* description, ScenarioDefinitions const* scenario_definitions)
{
    Rule* rule = (Rule*)malloc(sizeof(Rule));
    rule->rule_delete = (item_delete_function)Rule_delete;
    rule->type = Gherkin_Rule;
    rule->location.line = location.line;
    rule->location.column = location.column;
    rule->keyword = 0;
    if (keyword) {
       rule->keyword = StringUtilities_copy_string(keyword);
    }
    rule->name = 0;
    if (name) {
        rule->name = StringUtilities_copy_string(name);
    }
    rule->description = description;
    rule->scenario_definitions = scenario_definitions;
    return rule;
}

void Rule_delete(Rule const* rule)
{
    if (rule->keyword) {
        free((void*)rule->keyword);
    }
    if (rule->name) {
        free((void*)rule->name);
    }
    if (rule->description) {
        free((void*)rule->description);
    }
    if(rule->scenario_definitions) {
        ScenarioDefinitions_delete(rule->scenario_definitions);
    }

    free((void*)rule);
}

void Rules_delete(Rules const* rules) 
{
    if (rules->rule_count > 0) {
        int i;
        for(i = 0; i < rules->rule_count; ++i)
        {
            Rule_delete(rules->rules[i]);
        }
        free((void*)rules->rules);
    }
    
    free((void*)rules);
}
