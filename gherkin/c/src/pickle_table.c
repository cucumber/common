#include "pickle_table.h"
#include <stdlib.h>

const PickleTable* PickleTable_new(const PickleRows* rows) {
    PickleTable* pickle_table = (PickleTable*)malloc(sizeof(PickleTable));
    pickle_table->type = Argument_Table;
    pickle_table->rows = rows;
    return pickle_table;
}

void PickleTable_delete(const PickleTable* pickle_table) {
    if (!pickle_table) {
        return;
    }
    if (pickle_table->rows) {
        PickleRows_delete(pickle_table->rows);
    }
    free((void*)pickle_table);
}
