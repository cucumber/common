#include "example_table.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_example_table_content(const ExampleTable* example_table);

const ExampleTable* ExampleTable_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Tags* tags, const TableRow* table_header, const TableRows* table_body) {
    ExampleTable* example_table = (ExampleTable*)malloc(sizeof(ExampleTable));
    example_table->table_delete = (item_delete_function)ExampleTable_delete;
    example_table->type = Gherkin_Examples;
    example_table->location.line = location.line;
    example_table->location.column = location.column;
    example_table->keyword = 0;
    if (keyword) {
        example_table->keyword = StringUtilities_copy_string(keyword);
    }
    example_table->name = 0;
    if (name) {
        example_table->name = StringUtilities_copy_string(name);
    }
    example_table->description = description;
    example_table->tags = tags;
    example_table->table_header = table_header;
    example_table->table_body = table_body;
    return example_table;
}

void ExampleTable_delete(const ExampleTable* example_table) {
    if (!example_table) {
        return;
    }
    delete_example_table_content(example_table);
    free((void*)example_table);
}

void ExampleTable_transfer(ExampleTable* to_example_table, ExampleTable* from_example_table) {
    to_example_table->type = from_example_table->type;
    to_example_table->location.line = from_example_table->location.line;
    to_example_table->location.column = from_example_table->location.column;
    to_example_table->keyword = from_example_table->keyword;
    from_example_table->keyword = 0;
    to_example_table->name = from_example_table->name;
    from_example_table->name = 0;
    to_example_table->description = from_example_table->description;
    from_example_table->description = 0;
    to_example_table->tags = from_example_table->tags;
    from_example_table->tags = 0;
    to_example_table->table_header = from_example_table->table_header;
    from_example_table->table_header = 0;
    to_example_table->table_body = from_example_table->table_body;
    from_example_table->table_body = 0;
    ExampleTable_delete(from_example_table);
}

void Examples_delete(const Examples* examples) {
    if (!examples) {
        return;
    }
    if (examples->example_table) {
        int i;
        for(i = 0; i < examples->example_count; ++i) {
            delete_example_table_content(examples->example_table + i);
        }
        free((void*)examples->example_table);
    }
    free((void*)examples);
}

static void delete_example_table_content(const ExampleTable* example_table) {
    if (example_table->keyword) {
        free((void*)example_table->keyword);
    }
    if (example_table->name) {
        free((void*)example_table->name);
    }
    if (example_table->description) {
        free((void*)example_table->description);
    }
    if (example_table->tags) {
        Tags_delete(example_table->tags);
    }
    if (example_table->table_header) {
        TableRow_delete(example_table->table_header);
    }
    if (example_table->table_body) {
        TableRows_delete(example_table->table_body);
    }
}
