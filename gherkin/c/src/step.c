#include "step.h"
#include "data_table.h"
#include "doc_string.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_step_content(const Step* step);

const Step* Step_new(Location location, const wchar_t* keyword, const wchar_t* text, const StepArgument* argument) {
    Step* step = (Step*)malloc(sizeof(Step));
    step->step_delete = (item_delete_function)Step_delete;
    step->type = Gherkin_Step;
    step->location.line = location.line;
    step->location.column = location.column;
    if (keyword) {
        step->keyword = StringUtilities_copy_string(keyword);
    }
    if (text) {
        step->text = StringUtilities_copy_string(text);
    }
    step->argument = argument;
    return step;
}

void Step_delete(const Step* step) {
    if (!step) {
        return;
    }
    delete_step_content(step);
    free((void*)step);
}

void Step_transfer(Step* to_step, Step* from_step) {
    to_step->type = from_step->type;
    to_step->location.line = from_step->location.line;
    to_step->location.column = from_step->location.column;
    to_step->keyword = from_step->keyword;
    from_step->keyword = 0;
    to_step->text = from_step->text;
    from_step->text = 0;
    to_step->argument = from_step->argument;
    from_step->argument = 0;
    Step_delete(from_step);
}

void Steps_delete(const Steps* steps) {
    if (!steps) {
        return;
    }
    if (steps->step_count > 0) {
        int i;
        for (i = 0; i < steps->step_count; ++i) {
            delete_step_content(steps->steps + i);
        }
        free((void*)steps->steps);
    }
    free((void*)steps);
}

static void delete_step_content(const Step* step) {
    if (step->keyword) {
        free((void*)step->keyword);
    }
    if (step->text) {
        free((void*)step->text);
    }
    if (step->argument) {
        if (step->argument->type == Gherkin_DataTable) {
            DataTable_delete((DataTable*)step->argument);
        }
        else if (step->argument->type == Gherkin_DocString) {
            DocString_delete((DocString*)step->argument);
        }
    }
}
