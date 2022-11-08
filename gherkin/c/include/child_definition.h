#ifndef GHERKIN_CHILD_DEFINITION_H_
#define GHERKIN_CHILD_DEFINITION_H_

#include "ast.h"

typedef struct ChildDefinition {
    item_delete_function item_delete;
    GherkinAstType type;
} ChildDefinition;

typedef struct ChildDefinitions {
    int child_definition_count;
    ChildDefinition** child_definitions;
} ChildDefinitions;

#endif /* GHERKIN_CHILD_DEFINITION_H_ */
