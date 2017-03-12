#include "data_table.h"
#include <stdlib.h>

const DataTable* DataTable_new(Location location, const TableRows* rows) {
    DataTable* data_table = (DataTable*)malloc(sizeof(DataTable));
    data_table->table_delete = (item_delete_function)DataTable_delete;
    data_table->type = Gherkin_DataTable;
    data_table->location.line = location.line;
    data_table->location.column = location.column;
    data_table->rows = rows;
    return data_table;
}

void DataTable_delete(const DataTable* data_table) {
    if (!data_table) {
        return;
    }
    if (data_table->rows) {
        TableRows_delete(data_table->rows);
    }
    free((void*)data_table);
}

void DataTable_transfer(DataTable* to_data_table, DataTable* from_data_table) {
    to_data_table->type = from_data_table->type;
    to_data_table->location.line = from_data_table->location.line;
    to_data_table->location.column = from_data_table->location.column;
    to_data_table->rows = from_data_table->rows;
    from_data_table->rows = 0;
    DataTable_delete(from_data_table);
}
