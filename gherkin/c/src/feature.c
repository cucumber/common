#include "feature.h"
#include "scenario.h"
#include "string_utilities.h"
#include <stdlib.h>

const Feature* Feature_new(Location location, const wchar_t* language, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Tags* tags, const ScenarioDefinitions* scenario_definitions, const Rules* rules) {
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
    feature->scenario_definitions = scenario_definitions;
    feature->rules = rules;
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
    if (feature->rules) {
        Rules_delete(feature->rules);
    }
    if (feature->scenario_definitions) {
        ScenarioDefinitions_delete(feature->scenario_definitions);
    }
    free((void*)feature);
}
