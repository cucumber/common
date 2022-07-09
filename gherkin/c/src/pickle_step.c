#include "pickle_step.h"
#include "pickle_string.h"
#include "pickle_table.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_pickle_step_content(const PickleStep* pickle_step);

const PickleStep* PickleStep_new(const PickleAstNodeIds* ast_node_ids, IdGenerator* id_generator, const wchar_t* text, const PickleStepType pickle_step_type, const PickleArgument* argument) {
    PickleStep* pickle_step = (PickleStep*)malloc(sizeof(PickleStep));
    pickle_step->ast_node_ids = ast_node_ids;
    pickle_step->id = id_generator->new_id(id_generator);
    pickle_step->text = 0;
    if (text) {
        pickle_step->text = StringUtilities_copy_string(text);
    }
    pickle_step->pickle_step_type = pickle_step_type;
    pickle_step->argument = argument;
    return pickle_step;
}

void PickleStep_delete(const PickleStep* pickle_step) {
    if (!pickle_step) {
        return;
    }
    delete_pickle_step_content(pickle_step);
    free((void*)pickle_step);
}

void PickleStep_transfer(PickleStep* to_pickle_step, PickleStep* from_pickle_step) {
    to_pickle_step->ast_node_ids = from_pickle_step->ast_node_ids;
    from_pickle_step->ast_node_ids = 0;
    to_pickle_step->id = from_pickle_step->id;
    from_pickle_step->id = 0;
    to_pickle_step->text = from_pickle_step->text;
    from_pickle_step->text = 0;
    to_pickle_step->pickle_step_type = from_pickle_step->pickle_step_type;
    to_pickle_step->argument = from_pickle_step->argument;
    from_pickle_step->argument = 0;
    PickleStep_delete(from_pickle_step);
}

void PickleSteps_delete(const PickleSteps* pickle_steps) {
    if (!pickle_steps) {
        return;
    }
    if (pickle_steps->steps) {
        int i;
        for (i = 0; i < pickle_steps->step_count; ++i) {
            delete_pickle_step_content(pickle_steps->steps + i);
        }
        free((void*)pickle_steps->steps);
    }
    free((void*)pickle_steps);
}

static void delete_pickle_step_content(const PickleStep* pickle_step) {
    if (pickle_step->ast_node_ids) {
        PickleAstNodeIds_delete(pickle_step->ast_node_ids);
    }
    if (pickle_step->id) {
        free((void*)pickle_step->id);
    }
    if (pickle_step->text) {
        free((void*)pickle_step->text);
    }
    if (pickle_step->argument) {
        if (pickle_step->argument->type == Argument_String) {
            PickleString_delete((const PickleString*)pickle_step->argument);
        }
        else if (pickle_step->argument->type == Argument_Table) {
            PickleTable_delete((const PickleTable*)pickle_step->argument);
        }
    }
}
