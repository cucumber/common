#ifndef GHERKIN_PICKLE_ROW_H_
#define GHERKIN_PICKLE_ROW_H_

#include "pickle_cell.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct PickleRow {
    const PickleCells* pickle_cells;
} PickleRow;

typedef struct PickleRows {
    int row_count;
    PickleRow* pickle_rows;
} PickleRows;

const PickleRow* PickleRow_new(const PickleCells* pickle_cells);

void PickleRow_delete(const PickleRow* pickle_row);

void PickleRow_transfer(PickleRow* to_pickle_row, PickleRow* from_pickle_row);

void PickleRows_delete(const PickleRows* pickle_rows);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_ROW_H_ */
