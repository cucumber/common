#include "table_row.h"
#include <stdlib.h>

static void delete_table_row_content(const TableRow* table_row);

const TableRow* TableRow_new(Location location, const TableCells* table_cells) {
    TableRow* table_row  = (TableRow*)malloc(sizeof(TableRow));
    table_row->row_delete = (item_delete_function)TableRow_delete;
    table_row->type = Gherkin_TableRow;
    table_row->location.line = location.line;
    table_row->location.column = location.column;
    table_row->table_cells = table_cells;
    return table_row;
}

void TableRow_delete(const TableRow* table_row) {
    if (!table_row) {
        return;
    }
    delete_table_row_content(table_row);
    free((void*)table_row);
}

void TableRow_transfer(TableRow* to_table_row, TableRow* from_table_row) {
    to_table_row->type = from_table_row->type;
    to_table_row->location.line = from_table_row->location.line;
    to_table_row->location.column = from_table_row->location.column;
    to_table_row->table_cells = from_table_row->table_cells;
    from_table_row->table_cells = 0;
    TableRow_delete(from_table_row);
}

void TableRows_delete(const TableRows* table_rows) {
    if (!table_rows) {
        return;
    }
    if (table_rows->table_rows) {
        int i;
        for(i = 0; i < table_rows->row_count; ++i) {
            delete_table_row_content(table_rows->table_rows + i);
        }
        free((void*)table_rows->table_rows);
    }
    free((void*)table_rows);
}

static void delete_table_row_content(const TableRow* table_row) {
    if (table_row->table_cells) {
        TableCells_delete(table_row->table_cells);
    }
}
