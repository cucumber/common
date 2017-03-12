#include "pickle_cell.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_pickle_cell_content(const PickleCell* pickle_cell);

const PickleCell* PickleCell_new(const PickleLocation* location, const wchar_t* value) {
    PickleCell* pickle_cell  = (PickleCell*)malloc(sizeof(PickleCell));
    pickle_cell->location = location;
    pickle_cell->value = 0;
    if (value) {
        pickle_cell->value = StringUtilities_copy_string(value);
    }
    return pickle_cell;
}

void PickleCell_delete(const PickleCell* pickle_cell) {
    if (!pickle_cell) {
        return;
    }
    delete_pickle_cell_content(pickle_cell);
    free((void*)pickle_cell);
}

void PickleCell_transfer(PickleCell* to_pickle_cell, PickleCell* from_pickle_cell) {
    to_pickle_cell->location = from_pickle_cell->location;
    from_pickle_cell->location = 0;
    to_pickle_cell->value = from_pickle_cell->value;
    from_pickle_cell->value = 0;
    PickleCell_delete(from_pickle_cell);
}

void PickleCells_delete(const PickleCells* pickle_cells) {
    if (!pickle_cells) {
        return;
    }
    if (pickle_cells->pickle_cells) {
        int i;
        for(i = 0; i < pickle_cells->cell_count; ++i) {
            delete_pickle_cell_content(pickle_cells->pickle_cells + i);
        }
        free((void*)pickle_cells->pickle_cells);
    }
    free((void*)pickle_cells);
}

static void delete_pickle_cell_content(const PickleCell* pickle_cell) {
    if (pickle_cell->location) {
        PickleLocation_delete(pickle_cell->location);
    }
    if (pickle_cell->value) {
        free((void*)pickle_cell->value);
    }
}
