#ifndef GHERKIN_TABLE_ROW_H_
#define GHERKIN_TABLE_ROW_H_

#include "ast.h"
#include "location.h"
#include "tag.h"
#include "table_cell.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct TableRow {
    item_delete_function row_delete;
    GherkinAstType type;
    Location location;
    const TableCells* table_cells;
} TableRow;

typedef struct TableRows {
    int row_count;
    TableRow* table_rows;
} TableRows;

const TableRow* TableRow_new(Location location, const TableCells* table_cells);

void TableRow_delete(const TableRow* table_row);

void TableRow_transfer(TableRow* to_table_row, TableRow* from_table_row);

void TableRows_delete(const TableRows* table_rows);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_TABLE_ROW_H_ */
