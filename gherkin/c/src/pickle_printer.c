#include "pickle_printer.h"
#include "pickle_string.h"
#include "pickle_table.h"
#include "print_utilities.h"
#include <wchar.h>
#include <stdlib.h>
#include <stdbool.h>

static void print_location(FILE* file, const PickleLocation* location) {
    fprintf(file, "{\"line\":%d,", location->line);
    fprintf(file, "\"column\":%d}", location->column);
}

static void print_locations(FILE* file, const PickleLocations* locations, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ",");
    }
    fprintf(file, "\"locations\":[");
    if (locations) {
        int i;
        for (i = 0; i < locations->location_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_location(file, &locations->locations[i]);
        }
    }
    fprintf(file, "]");
    *has_predecessor = true;
}

static void print_table_cell(FILE* file, const PickleCell* pickle_cell) {
    fprintf(file, "{\"location\": ");
    print_location(file, pickle_cell->location);
    if (wcslen(pickle_cell->value)) {
        fprintf(file, ",\"value\": \"");
        PrintUtilities_print_json_string(file, pickle_cell->value);
        fprintf(file, "\"");
    }
    fprintf(file, "}");
}

static void print_table_row(FILE* file, const PickleRow* pickle_row) {
    fprintf(file, "{\"cells\":[");
    int i;
    for (i = 0; i < pickle_row->pickle_cells->cell_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_table_cell(file, &pickle_row->pickle_cells->pickle_cells[i]);
    }
    fprintf(file, "]}");
}

static void print_pickle_table(FILE* file, const PickleTable* pickle_table) {
    fprintf(file, "\"dataTable\":{\"rows\":[");
    int i;
    for (i = 0; i < pickle_table->rows->row_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_table_row(file, &pickle_table->rows->pickle_rows[i]);
    }
    fprintf(file, "]}");
}

static void print_pickle_string(FILE* file, const PickleString* pickle_string) {
    fprintf(file, "\"docString\":{\"location\": ");
    print_location(file, &pickle_string->location);
    fprintf(file, ",\"content\":\"");
    if (pickle_string->content) {
        PrintUtilities_print_json_string(file, pickle_string->content);
    }
    fprintf(file, "\"");
    if(pickle_string->content_type) {
        fprintf(file, ",\"contentType\":\"");
        PrintUtilities_print_json_string(file, pickle_string->content_type);
        fprintf(file, "\"");
    }
    fprintf(file, "}");
}

static void print_name(FILE* file, const wchar_t* name, bool* has_predecessor) {
    if (wcslen(name)) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"name\" : \"");
        PrintUtilities_print_json_string(file, name);
        fprintf(file, "\"");
        *has_predecessor = true;
    }
}

static void print_tag(FILE* file, const PickleTag* tag) {
    fprintf(file, "{\"location\":");
    print_location(file, &tag->location);
    bool has_predecessor = true;
    print_name(file, tag->name, &has_predecessor);
    fprintf(file, "}");
}

static void print_text(FILE* file, const wchar_t* text, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ",");
    }
    fprintf(file, "\"text\":\"");
    PrintUtilities_print_json_string(file, text);
    fprintf(file, "\"");
    *has_predecessor = true;
}

static void print_pickle_argument(FILE* file, const PickleArgument* argument, bool* has_predecessor) {
    if (argument) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        if (argument->type == Argument_String) {
            print_pickle_string(file, (const PickleString*)argument);
        }
        if (argument->type == Argument_Table) {
            print_pickle_table(file, (const PickleTable*)argument);
        }
        *has_predecessor = true;
    }
}

static void print_pickle_step(FILE* file, const PickleStep* step) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_locations(file, step->locations, &has_predecessor);
    print_pickle_argument(file, step->argument, &has_predecessor);
    print_text(file, step->text, &has_predecessor);
    fprintf(file, "}");
}

static void print_uri(FILE* file, const wchar_t* uri, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ",");
    }
    fprintf(file, "\"uri\":\"");
    PrintUtilities_print_json_string(file, uri);
    fprintf(file, "\"");
    *has_predecessor = true;
}

static void print_language(FILE* file, const wchar_t* language, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ",");
    }
    fprintf(file, "\"language\" : \"");
    PrintUtilities_print_json_string(file, language);
    fprintf(file, "\"");
    *has_predecessor = true;
}

static void print_tags(FILE* file, const PickleTags* tags, bool* has_predecessor) {
    if (tags && tags->tag_count) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"tags\":[");
        int i;
        for (i = 0; i < tags->tag_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_tag(file, &tags->tags[i]);
        }
        fprintf(file, "]");
        *has_predecessor = true;
    }
}

static void print_steps(FILE* file, const PickleSteps* steps, bool* has_predecessor) {
    if (steps && steps->step_count) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"steps\":[");
        int i;
        for (i = 0; i < steps->step_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_pickle_step(file, &steps->steps[i]);
        }
        fprintf(file, "]");
        *has_predecessor = true;
    }
}

void PicklePrinter_print_pickle(FILE* file, const Pickle* pickle, const wchar_t* uri) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_uri(file, uri, &has_predecessor);
    print_language(file, pickle->language, &has_predecessor);
    print_name(file, pickle->name, &has_predecessor);
    print_locations(file, pickle->locations, &has_predecessor);
    print_tags(file, pickle->tags, &has_predecessor);
    print_steps(file, pickle->steps, &has_predecessor);
    fprintf(file, "}");
}
