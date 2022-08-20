#include "pickle_printer.h"
#include "pickle_string.h"
#include "pickle_table.h"
#include "print_utilities.h"
#include <wchar.h>
#include <stdlib.h>

static void print_id(FILE* file, const wchar_t* id) {
    fprintf(file, "\"id\":\"");
    PrintUtilities_print_json_string(file, id);
    fprintf(file, "\",");
}

static void print_pickle_step_type(FILE* file, const PickleStepType pickle_step_type) {
    fprintf(file, "\"type\":\"");
    switch (pickle_step_type) {
    case Pickle_Step_Unknown:
        fprintf(file, "Unknown");
	break;
    case Pickle_Step_Context:
        fprintf(file, "Context");
	break;
    case Pickle_Step_Action:
        fprintf(file, "Action");
	break;
    case Pickle_Step_Outcome:
        fprintf(file, "Outcome");
	break;
    }
    fprintf(file, "\"");
}

static void print_table_cell(FILE* file, const PickleCell* pickle_cell) {
    fprintf(file, "{\"value\": \"");
    if (pickle_cell->value && wcslen(pickle_cell->value) > 0) {
        PrintUtilities_print_json_string(file, pickle_cell->value);
    }
    fprintf(file, "\"}");
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
    fprintf(file, "\"docString\": {\"content\":\"");
    if (pickle_string->content) {
        PrintUtilities_print_json_string(file, pickle_string->content);
    }
    fprintf(file, "\"");
    if(pickle_string->media_type) {
        fprintf(file, ",\"mediaType\":\"");
        PrintUtilities_print_json_string(file, pickle_string->media_type);
        fprintf(file, "\"");
    }
    fprintf(file, "}");
}

static void print_ast_node_id(FILE* file, const PickleAstNodeId* ast_node_id) {
    fprintf(file, "\"astNodeId\":\"");
    PrintUtilities_print_json_string(file, ast_node_id->id);
    fprintf(file, "\"");
}

static void print_tag(FILE* file, const PickleTag* tag) {
    fprintf(file, "{");
    print_ast_node_id(file, &tag->ast_node_id);
    fprintf(file, ",\"name\":\"");
    PrintUtilities_print_json_string(file, tag->name);
    fprintf(file, "\"}");
}

static void print_tags(FILE* file, const PickleTags* tags) {
    fprintf(file, ",\"tags\":[");
    if (tags && tags->tag_count > 0) {
        int i;
        for (i = 0; i < tags->tag_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_tag(file, &tags->tags[i]);
        }
    }
    fprintf(file, "]");
}

static void print_ast_node_ids(FILE* file, const PickleAstNodeIds* ast_node_ids) {
    fprintf(file, "\"astNodeIds\":[");
    if (ast_node_ids && ast_node_ids->ast_node_id_count > 0) {
        int i;
        for (i = 0; i < ast_node_ids->ast_node_id_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            fprintf(file, "\"");
            PrintUtilities_print_json_string(file, ast_node_ids->ast_node_ids[i].id);
            fprintf(file, "\"");
        }
    }
    fprintf(file, "]");
}

static void print_pickle_step(FILE* file, const PickleStep* step) {
    fprintf(file, "{");
    print_id(file, step->id);
    print_ast_node_ids(file, step->ast_node_ids);
    if (step->argument) {
        fprintf(file, ",\"argument\":{");
        if (step->argument->type == Argument_String) {
            print_pickle_string(file, (const PickleString*)step->argument);
        }
        if (step->argument->type == Argument_Table) {
            print_pickle_table(file, (const PickleTable*)step->argument);
        }
        fprintf(file, "}");
    }
    fprintf(file, ",\"text\":\"");
    PrintUtilities_print_json_string(file, step->text);
    fprintf(file, "\",");
    print_pickle_step_type(file, step->pickle_step_type);
    fprintf(file, "}");
}

void PicklePrinter_print_pickle(FILE* file, const Pickle* pickle) {
    fprintf(file, "{");
    fprintf(file, "\"uri\":\"");
    PrintUtilities_print_json_string(file, pickle->uri);
    fprintf(file, "\",\"language\":\"");
    PrintUtilities_print_json_string(file, pickle->language);
    fprintf(file, "\",");
    print_id(file, pickle->id);
    fprintf(file, "\"name\":\"");
    if (pickle->name && wcslen(pickle->name) > 0) {
        PrintUtilities_print_json_string(file, pickle->name);
    }
    fprintf(file, "\",");
    print_ast_node_ids(file, pickle->ast_node_ids);
    print_tags(file, pickle->tags);
    fprintf(file, ",\"steps\":[");
    if (pickle->steps && pickle->steps->step_count >0) {
        int i;
        for (i = 0; i < pickle->steps->step_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_pickle_step(file, &pickle->steps->steps[i]);
        }
    }
    fprintf(file, "]}");
}
