#ifndef GHERKIN_STEP_H_
#define GHERKIN_STEP_H_

#include <wchar.h>

#include "ast.h"
#include "id_generator.h"
#include "location.h"
#include "keyword_type.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct StepArgument {
    item_delete_function argument_delete;
    GherkinAstType type;
} StepArgument;

typedef struct Step {
    item_delete_function step_delete;
    GherkinAstType type;
    Location location;
    const wchar_t* id;
    wchar_t* keyword;
    KeywordType keyword_type;
    wchar_t* text;
    const StepArgument* argument;
} Step;

typedef struct Steps {
    int step_count;
    Step* steps;
} Steps;

const Step* Step_new(Location location, IdGenerator* id_generator, const wchar_t* keyword, const KeywordType keyword_type, const wchar_t* text, const StepArgument* argument);

void Step_delete(const Step* step);

void Step_transfer(Step* to_step, Step* from_step);

void Steps_delete(const Steps* steps);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_STEP_H_ */
