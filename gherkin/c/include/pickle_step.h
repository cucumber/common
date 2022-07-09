#ifndef GHERKIN_PICKLE_STEP_H_
#define GHERKIN_PICKLE_STEP_H_

#include <wchar.h>

#include "pickle_ast_node_id.h"
#include "pickle_argument.h"
#include "id_generator.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum PickleStepType {
    Pickle_Step_Unknown,
    Pickle_Step_Context,
    Pickle_Step_Action,
    Pickle_Step_Outcome
} PickleStepType;

typedef struct PickleStep {
    const PickleAstNodeIds* ast_node_ids;
    const wchar_t* id;
    wchar_t* text;
    PickleStepType pickle_step_type;
    const PickleArgument* argument;
} PickleStep;

typedef struct PickleSteps {
    int step_count;
    PickleStep* steps;
} PickleSteps;

const PickleStep* PickleStep_new(const PickleAstNodeIds* ast_node_ids, IdGenerator* id_generator, const wchar_t* text, const PickleStepType pickle_step_type, const PickleArgument* argument);

void PickleStep_delete(const PickleStep* pickle_step);

void PickleStep_transfer(PickleStep* to_pickle_step, PickleStep* from_pickle_step);

void PickleSteps_delete(const PickleSteps* pickle_steps);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_STEP_H_ */
