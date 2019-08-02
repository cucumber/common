#include "pickle_printer.h"
#include "pickle_string.h"
#include "pickle_table.h"
#include "print_utilities.h"
#include <wchar.h>
#include <stdlib.h>

static void print_location(FILE* file, const PickleLocation* location) {
    fprintf(file, "{\"line\":%d,", location->line);
    fprintf(file, "\"column\":%d}", location->column);
}

static void print_locations(FILE* file, const PickleLocations* locations) {
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
}

static void print_table_cell(FILE* file, const PickleCell* pickle_cell) {
    fprintf(file, "{\"location\": ");
    print_location(file, pickle_cell->location);
    if (pickle_cell->value && wcslen(pickle_cell->value) > 0) {
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
    fprintf(file, ",\"dataTable\":{\"rows\":[");
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
    fprintf(file, ",\"docString\": {\"location\": ");
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

static void print_tag(FILE* file, const PickleTag* tag) {
    fprintf(file, "{\"location\":");
    print_location(file, &tag->location);
    fprintf(file, ",\"name\":\"");
    PrintUtilities_print_json_string(file, tag->name);
    fprintf(file, "\"}");
}

static void print_tags(FILE* file, const PickleTags* tags) {
    if (tags && tags->tag_count > 0) {
        fprintf(file, ",\"tags\":[");
        int i;
        for (i = 0; i < tags->tag_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_tag(file, &tags->tags[i]);
        }
        fprintf(file, "]");
    }
}


static void print_pickle_step(FILE* file, const PickleStep* step) {
    fprintf(file, "{");
    print_locations(file, step->locations);
    if (step->argument) {
        if (step->argument->type == Argument_String) {
            print_pickle_string(file, (const PickleString*)step->argument);
        }
        if (step->argument->type == Argument_Table) {
            print_pickle_table(file, (const PickleTable*)step->argument);
        }
    }
    fprintf(file, ",\"text\":\"");
    PrintUtilities_print_json_string(file, step->text);
    fprintf(file, "\"}");
}

void PicklePrinter_print_pickle(FILE* file, const Pickle* pickle) {
    fprintf(file, "{");
    fprintf(file, "\"uri\":\"");
    PrintUtilities_print_json_string(file, pickle->uri);
    fprintf(file, "\",\"language\":\"");
    PrintUtilities_print_json_string(file, pickle->language);
    fprintf(file, "\",");
    if (pickle->name && wcslen(pickle->name) > 0) {
        fprintf(file, "\"name\":\"");
        PrintUtilities_print_json_string(file, pickle->name);
        fprintf(file, "\",");
    }
    print_locations(file, pickle->locations);
    print_tags(file, pickle->tags);
    if (pickle->steps && pickle->steps->step_count >0) {
        fprintf(file, ",\"steps\":[");
        int i;
        for (i = 0; i < pickle->steps->step_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_pickle_step(file, &pickle->steps->steps[i]);
        }
        fprintf(file, "]");
    }
    fprintf(file, "}");
}
