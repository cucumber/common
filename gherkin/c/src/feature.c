#include "feature.h"
#include "background.h"
#include "rule.h"
#include "scenario.h"
#include "string_utilities.h"
#include <stdlib.h>

const Feature* Feature_new(Location location, const wchar_t* language, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Tags* tags, const ChildDefinitions* child_definitions) {
    Feature* feature = (Feature*)malloc(sizeof(Feature));
    feature->feature_delete = (item_delete_function)Feature_delete;
    feature->type = Gherkin_Feature;
    feature->location.line = location.line;
    feature->location.column = location.column;
    feature->language = 0;
    if (language) {
        feature->language = StringUtilities_copy_string(language);
    }
    if (keyword) {
        feature->keyword = StringUtilities_copy_string(keyword);
    }
    if (name) {
        feature->name = StringUtilities_copy_string(name);
    }
    feature->description = description;
    feature->tags = tags;
    feature->child_definitions = child_definitions;
    return feature;
}

void Feature_delete(const Feature* feature) {
    if (!feature) {
        return;
    }
    if (feature->language) {
        free((void*)feature->language);
    }
    if (feature->keyword) {
        free((void*)feature->keyword);
    }
    if (feature->name) {
        free((void*)feature->name);
    }
    if (feature->description) {
        free((void*)feature->description);
    }
    if (feature->tags) {
        Tags_delete(feature->tags);
    }
    if (feature->child_definitions) {
        ChildDefinition* child_definition;
        if (feature->child_definitions->child_definition_count > 0) {
            int i;
            for(i = 0; i < feature->child_definitions->child_definition_count; ++i) {
                child_definition = feature->child_definitions->child_definitions[i];
                if (child_definition->type == Gherkin_Background) {
                    Background_delete((Background*)child_definition);
                }
                else if (child_definition->type == Gherkin_Scenario) {
                    Scenario_delete((Scenario*)child_definition);
                }
                else if (child_definition->type == Gherkin_Rule) {
                    Rule_delete((Rule*)child_definition);
                }
            }
            free((void*)feature->child_definitions->child_definitions);
        }
        free((void*)feature->child_definitions);
    }
    free((void*)feature);
}
