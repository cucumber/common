#ifndef GHERKIN_PICKLE_TABLE_H_
#define GHERKIN_PICKLE_TABLE_H_

#include "pickle_argument.h"
#include "pickle_row.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct PickleTable {
    PickleArgumentType type;
    const PickleRows* rows;
} PickleTable;

const PickleTable* PickleTable_new(const PickleRows* rows);

void PickleTable_delete(const PickleTable* pickle_table);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_TABLE_H_ */
