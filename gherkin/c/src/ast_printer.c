#include "ast_printer.h"
#include "feature.h"
#include "background.h"
#include "rule.h"
#include "scenario.h"
#include "step.h"
#include "data_table.h"
#include "doc_string.h"
#include "token_scanner.h"
#include "token_matcher.h"
#include "parser.h"
#include "ast_builder.h"
#include "print_utilities.h"
#include <stdlib.h>


static void print_location(FILE* file, const Location* location) {
    fprintf(file, "\"location\":{");
    fprintf(file, "\"line\":%d,", location->line);
    fprintf(file, "\"column\":%d", location->column);
    fprintf(file, "}");
}

static void print_table_cell(FILE* file, const TableCell* table_cell) {
    fprintf(file, "{");
    print_location(file, &table_cell->location);
    if (table_cell->value && wcslen(table_cell->value) > 0) {
        fprintf(file, ",\"value\":\"");
        PrintUtilities_print_json_string(file, table_cell->value);
        fprintf(file, "\"");
    }
    fprintf(file, "}");
}

static void print_table_row(FILE* file, const TableRow* table_row) {
    fprintf(file, "{");
    print_location(file, &table_row->location);
    fprintf(file, ",\"cells\":[");
    int i;
    for (i = 0; i < table_row->table_cells->cell_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_table_cell(file, &table_row->table_cells->table_cells[i]);
    }
    fprintf(file, "]}");
}

static void print_data_table(FILE* file, const DataTable* data_table) {
    fprintf(file, "{");
    print_location(file, &data_table->location);
    fprintf(file, ",\"rows\":[");
    int i;
    for (i = 0; i < data_table->rows->row_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_table_row(file, &data_table->rows->table_rows[i]);
    }
    fprintf(file, "]}");
}

static void print_doc_string(FILE* file, const DocString* doc_string) {
    fprintf(file, "{");
    print_location(file, &doc_string->location);
    if (doc_string->delimiter) {
        fprintf(file, ",\"delimiter\":\"");
        PrintUtilities_print_json_string(file, doc_string->delimiter);
        fprintf(file, "\"");
    }
    if (doc_string->content_type) {
        fprintf(file, ",\"contentType\":\"");
        PrintUtilities_print_json_string(file, doc_string->content_type);
        fprintf(file, "\"");
    }
    if (doc_string->content) {
        fprintf(file, ",\"content\":\"");
        PrintUtilities_print_json_string(file, doc_string->content);
        fprintf(file, "\"");
    }
    fprintf(file, "}");
}

static void print_keyword(FILE* file, const wchar_t* keyword) {
    fprintf(file, "\"keyword\":\"");
    PrintUtilities_print_json_string(file, keyword);
    fprintf(file, "\",");
}

static void print_text(FILE* file, const wchar_t* text) {
    fprintf(file, "\"text\":\"");
    PrintUtilities_print_json_string(file, text);
    fprintf(file, "\",");
}

static void print_step(FILE* file, const Step* step) {
    fprintf(file, "{");
    print_keyword(file, step->keyword);
    print_text(file, step->text);
    print_location(file, &step->location);
    if (step->argument) {
        if (step->argument->type == Gherkin_DataTable) {
            fprintf(file, ",\"dataTable\":");
            print_data_table(file, (DataTable*)step->argument);
        }
        else if (step->argument->type == Gherkin_DocString) {
            fprintf(file, ",\"docString\":");
            print_doc_string(file, (DocString*)step->argument);
        }
    }
    fprintf(file, "}");
}

static void print_name(FILE* file, const wchar_t* name) {
    if (name && wcslen(name) > 0) {
        fprintf(file, "\"name\":\"");
        PrintUtilities_print_json_string(file, name);
        fprintf(file, "\",");
    }
}

static void print_description(FILE* file, const wchar_t* description) {
    if (description) {
        fprintf(file, "\"description\":\"");
        PrintUtilities_print_json_string(file, description);
        fprintf(file, "\",");
    }
}


static void print_background(FILE* file, const Background* background) {
    fprintf(file, "{\"background\":{");
    print_keyword(file, background->keyword);
    print_name(file, background->name);
    print_description(file, background->description);
    print_location(file, &background->location);
    if (background->steps && background->steps->step_count > 0) {
        fprintf(file, ",\"steps\":[");
        int i;
        for (i = 0; i < background->steps->step_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_step(file, &background->steps->steps[i]);
        }
        fprintf(file, "]");
    }
    fprintf(file, "}}");
}

static void print_tag(FILE* file, const Tag* tag) {
    fprintf(file, "{");
    print_location(file, &tag->location);
    fprintf(file, ",\"name\":\"");
    PrintUtilities_print_json_string(file, tag->name);
    fprintf(file, "\"}");
}

static void print_tags(FILE* file, const Tags* tags) {
    if (tags && tags->tag_count > 0) {
        fprintf(file, "\"tags\":[");
        int i;
        for (i = 0; i < tags->tag_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_tag(file, &tags->tags[i]);
        }
        fprintf(file, "],");
    }
}


static void print_example_table(FILE* file, const ExampleTable* example_table) {
    fprintf(file, "{");
    print_description(file, example_table->description);
    print_keyword(file, example_table->keyword);
    print_name(file, example_table->name);
    print_tags(file, example_table->tags);
    print_location(file, &example_table->location);
    int i;
    if (example_table->table_header) {
        fprintf(file, ",\"tableHeader\":");
        print_table_row(file, example_table->table_header);
    }
    if (example_table->table_body && example_table->table_body->row_count > 0) {
        fprintf(file, ",\"tableBody\":[");
        for (i = 0; i < example_table->table_body->row_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_table_row(file, &example_table->table_body->table_rows[i]);
        }
        fprintf(file, "]");
    }
    fprintf(file, "}");
}


static void print_scenario(FILE* file, const Scenario* scenario) {
    fprintf(file, "{\"scenario\":{");
    print_tags(file, scenario->tags);
    print_keyword(file, scenario->keyword);
    print_name(file, scenario->name);
    print_description(file, scenario->description);
    print_location(file, &scenario->location);
    int i;
    if (scenario->steps && scenario->steps->step_count > 0) {
        fprintf(file, ",\"steps\":[");
        for (i = 0; i < scenario->steps->step_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_step(file, &scenario->steps->steps[i]);
        }
        fprintf(file, "]");
    }
    if (scenario->examples && scenario->examples->example_count > 0) {
        fprintf(file, ",\"examples\":[");
        for (i = 0; i < scenario->examples->example_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_example_table(file, &scenario->examples->example_table[i]);
        }
        fprintf(file, "]");
    }
    fprintf(file, "}}");
}


static void print_comment(FILE* file, const Comment* comment) {
    fprintf(file, "{");
    print_text(file, comment->text);
    print_location(file, &comment->location);
    fprintf(file, "}");
}


static void print_comments(FILE* file, const Comments* comments) {
    if (comments->comment_count > 0) {
        fprintf(file, ",\"comments\":[");
        int i;
        for (i = 0; i < comments->comment_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_comment(file, &comments->comments[i]);
        }
        fprintf(file, "]");
    }
}


static void print_rule(FILE* file, const Rule* rule) {
    fprintf(file, "{\"rule\":{");
    print_keyword(file, rule->keyword);
    print_name(file, rule->name);
    print_description(file, rule->description);
    print_location(file, &rule->location);
    if (rule->child_definitions && rule->child_definitions->child_definition_count > 0) {
        fprintf(file, ",\"children\":[");
        int i;
        for (i = 0; i < rule->child_definitions->child_definition_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            if (rule->child_definitions->child_definitions[i]->type == Gherkin_Background) {
                print_background(file, (Background*)rule->child_definitions->child_definitions[i]);
            }
            else if (rule->child_definitions->child_definitions[i]->type == Gherkin_Scenario) {
                print_scenario(file, (Scenario*)rule->child_definitions->child_definitions[i]);
            }
        }
        fprintf(file, "]");
    }
    fprintf(file, "}}");
}


static void print_feature(FILE* file, const Feature* feature) {
    fprintf(file, "{");
    print_tags(file, feature->tags);
    fprintf(file, "\"language\":\"");
    PrintUtilities_print_json_string(file, feature->language);
    fprintf(file, "\",");
    print_keyword(file, feature->keyword);
    print_name(file, feature->name);
    print_description(file, feature->description);
    print_location(file, &feature->location);
    if (feature->child_definitions && feature->child_definitions->child_definition_count > 0) {
        fprintf(file, ",\"children\":[");
        int i;
        for (i = 0; i < feature->child_definitions->child_definition_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            if (feature->child_definitions->child_definitions[i]->type == Gherkin_Background) {
                print_background(file, (Background*)feature->child_definitions->child_definitions[i]);
            }
            else if (feature->child_definitions->child_definitions[i]->type == Gherkin_Scenario) {
                print_scenario(file, (Scenario*)feature->child_definitions->child_definitions[i]);
            }
            else if (feature->child_definitions->child_definitions[i]->type == Gherkin_Rule) {
                print_rule(file, (Rule*)feature->child_definitions->child_definitions[i]);
            }
        }
        fprintf(file, "]");
    }
    fprintf(file, "}");
}

void AstPrinter_print_gherkin_document(FILE* file, const GherkinDocument* gherkin_document) {
    fprintf(file, "{");
    fprintf(file, "\"uri\":\"");
    PrintUtilities_print_json_string(file, gherkin_document->uri);
    fprintf(file, "\"");
    if (gherkin_document->feature) {
        fprintf(file, ",\"feature\":");
        print_feature(file, gherkin_document->feature);
    }
    if (gherkin_document->comments) {
        print_comments(file, gherkin_document->comments);
    }
    fprintf(file, "}");
}
