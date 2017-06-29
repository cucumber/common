#include "table_cell.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_table_cell_content(const TableCell* table_cell);

const TableCell* TableCell_new(Location location, const wchar_t* value) {
    TableCell* table_cell  = (TableCell*)malloc(sizeof(TableCell));
    table_cell->cell_delete = (item_delete_function)TableCell_delete;
    table_cell->type = Gherkin_TableCell;
    table_cell->location.line = location.line;
    table_cell->location.column = location.column;
    table_cell->value = 0;
    if (value) {
        table_cell->value = StringUtilities_copy_string(value);
    }
    return table_cell;
}

void TableCell_delete(const TableCell* table_cell) {
    if (!table_cell) {
        return;
    }
    delete_table_cell_content(table_cell);
    free((void*)table_cell);
}

void TableCell_transfer(TableCell* to_table_cell, TableCell* from_table_cell) {
    to_table_cell->type = from_table_cell->type;
    to_table_cell->location.line = from_table_cell->location.line;
    to_table_cell->location.column = from_table_cell->location.column;
    to_table_cell->value = from_table_cell->value;
    from_table_cell->value = 0;
    TableCell_delete(from_table_cell);
}

void TableCells_delete(const TableCells* table_cells) {
    if (!table_cells) {
        return;
    }
    if (table_cells->table_cells) {
        int i;
        for(i = 0; i < table_cells->cell_count; ++i) {
            delete_table_cell_content(table_cells->table_cells + i);
        }
        free((void*)table_cells->table_cells);
    }
    free((void*)table_cells);
}

static void delete_table_cell_content(const TableCell* table_cell) {
    if (table_cell->value) {
        free((void*)table_cell->value);
    }
}
