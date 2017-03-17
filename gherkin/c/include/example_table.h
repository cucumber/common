#ifndef GHERKIN_EXAMPLE_TABLE_H_
#define GHERKIN_EXAMPLE_TABLE_H_

#include <wchar.h>

#include "ast.h"
#include "location.h"
#include "tag.h"
#include "table_row.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct ExampleTable {
    item_delete_function table_delete;
    GherkinAstType type;
    Location location;
    wchar_t* keyword;
    wchar_t* name;
    const wchar_t* description;
    const Tags* tags;
    const TableRow* table_header;
    const TableRows* table_body;
} ExampleTable;

typedef struct Examples {
    int example_count;
    ExampleTable* example_table;
} Examples;

const ExampleTable* ExampleTable_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Tags* tags, const TableRow* table_header, const TableRows* table_body);

void ExampleTable_delete(const ExampleTable* example_table);

void ExampleTable_transfer(ExampleTable* to_example_table, ExampleTable* from_example_table);

void Examples_delete(const Examples* examples);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_EXAMPLE_TABLE_H_ */
