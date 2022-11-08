#ifndef GHERKIN_DATA_TABLE_H_
#define GHERKIN_DATA_TABLE_H_

#include "ast.h"
#include "location.h"
#include "table_row.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct DataTable {
    item_delete_function table_delete;
    GherkinAstType type;
    Location location;
    const TableRows* rows;
} DataTable;

const DataTable* DataTable_new(Location location, const TableRows* rows);

void DataTable_delete(const DataTable* data_table);

void DataTable_transfer(DataTable* to_data_table, DataTable* from_data_table);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_DATA_TABLE_H_ */
