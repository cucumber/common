#include "pickle_row.h"
#include <stdlib.h>

static void delete_pickle_row_content(const PickleRow* pickle_row);

const PickleRow* PickleRow_new(const PickleCells* pickle_cells) {
    PickleRow* pickle_row  = (PickleRow*)malloc(sizeof(PickleRow));
    pickle_row->pickle_cells = pickle_cells;
    return pickle_row;
}

void PickleRow_delete(const PickleRow* pickle_row) {
    if (!pickle_row) {
        return;
    }
    delete_pickle_row_content(pickle_row);
    free((void*)pickle_row);
}

void PickleRow_transfer(PickleRow* to_pickle_row, PickleRow* from_pickle_row) {
    to_pickle_row->pickle_cells = from_pickle_row->pickle_cells;
    from_pickle_row->pickle_cells = 0;
    PickleRow_delete(from_pickle_row);
}

void PickleRows_delete(const PickleRows* pickle_rows) {
    if (!pickle_rows) {
        return;
    }
    if (pickle_rows->pickle_rows) {
        int i;
        for(i = 0; i < pickle_rows->row_count; ++i) {
            delete_pickle_row_content(pickle_rows->pickle_rows + i);
        }
        free((void*)pickle_rows->pickle_rows);
    }
    free((void*)pickle_rows);
}

static void delete_pickle_row_content(const PickleRow* pickle_row) {
    if (pickle_row->pickle_cells) {
        PickleCells_delete(pickle_row->pickle_cells);
    }
}
