#include "ast_printer.h"
#include "feature.h"
#include "scenario.h"
#include "scenario_outline.h"
#include "step.h"
#include "data_table.h"
#include "doc_string.h"
#include "token_scanner.h"
#include "token_matcher.h"
#include "parser.h"
#include "ast_builder.h"
#include "print_utilities.h"
#include <stdlib.h>

static void print_location(FILE* file, const Location* location, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ",");
    }
    fprintf(file, "\"location\":{");
    fprintf(file, "\"line\":%d,", location->line);
    fprintf(file, "\"column\":%d", location->column);
    fprintf(file, "}");
    *has_predecessor = true;
}

static void print_cell_value(FILE* file, const wchar_t* value, bool* has_predecessor) {
    if (wcslen(value)) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"value\":\"");
        PrintUtilities_print_json_string(file, value);
        fprintf(file, "\"");
        *has_predecessor = true;
    }
}

static void print_table_cell(FILE* file, const TableCell* table_cell) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_location(file, &table_cell->location, &has_predecessor);
    print_cell_value(file, table_cell->value, &has_predecessor);
    fprintf(file, "}");
}

static void print_table_cells(FILE* file, const TableCells* table_cells, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ", ");
    }
    fprintf(file, "\"cells\":[");
    int i;
    for (i = 0; i < table_cells->cell_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_table_cell(file, &table_cells->table_cells[i]);
    }
    fprintf(file, "]");
    *has_predecessor = true;
}

static void print_table_row(FILE* file, const TableRow* table_row) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_location(file, &table_row->location, &has_predecessor);
    print_table_cells(file, table_row->table_cells, &has_predecessor);
    fprintf(file, "}");
}

static void print_table_rows(FILE* file, const TableRows* rows, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ",");
    }
    fprintf(file, "\"rows\":[");
    int i;
    for (i = 0; i < rows->row_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_table_row(file, &rows->table_rows[i]);
    }
    fprintf(file, "]");
    *has_predecessor = true;
}

static void print_data_table(FILE* file, const DataTable* data_table) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_location(file, &data_table->location, &has_predecessor);
    print_table_rows(file, data_table->rows, &has_predecessor);
    fprintf(file, "}");
}

static void print_doc_string_content_type(FILE* file, const wchar_t* content_type, bool* has_predecessor) {
    if (content_type) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"contentType\":\"");
        PrintUtilities_print_json_string(file, content_type);
        fprintf(file, "\"");
        *has_predecessor = true;
    }
}

static void print_doc_string_content(FILE* file, const wchar_t* content, bool* has_predecessor) {
    if (content){
        if (*has_predecessor) {
           fprintf(file, ","); 
        }
        fprintf(file, "\"content\":\"");
        PrintUtilities_print_json_string(file, content);
        fprintf(file, "\""); 
        *has_predecessor = true;
    }
}

static void print_doc_string_delimiter(FILE* file, const wchar_t* delimiter, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ",");
    }
    fprintf(file, "\"delimiter\":\"");
    PrintUtilities_print_json_string(file, delimiter);
    fprintf(file, "\"");
    *has_predecessor = true;
}

static void print_doc_string(FILE* file, const DocString* doc_string) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_location(file, &doc_string->location, &has_predecessor);
    print_doc_string_content_type(file, doc_string->content_type, &has_predecessor);
    print_doc_string_content(file, doc_string->content, &has_predecessor);
    print_doc_string_delimiter(file, doc_string->delimiter, &has_predecessor);
    fprintf(file, "}");
}

static void print_keyword(FILE* file, const wchar_t* keyword, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ",");
    }
    fprintf(file, "\"keyword\":\"");
    PrintUtilities_print_json_string(file, keyword);
    fprintf(file, "\"");
    *has_predecessor = true;
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

static void print_step_argument(FILE* file, const StepArgument* argument, bool* has_predecessor) {
    if (argument) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        if (argument->type == Gherkin_DataTable) {
            fprintf(file, "\"dataTable\":");
            print_data_table(file, (DataTable*)argument);
        }
        else if (argument->type == Gherkin_DocString) {
            fprintf(file, "\"docString\":");
            print_doc_string(file, (DocString*)argument);
        }
        *has_predecessor = true;
    }
}

static void print_step(FILE* file, const Step* step) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_location(file, &step->location, &has_predecessor);
    print_keyword(file, step->keyword, &has_predecessor);
    print_text(file, step->text, &has_predecessor);
    print_step_argument(file, step->argument, &has_predecessor);
    fprintf(file, "}");
}

static void print_name(FILE* file, const wchar_t* name, bool* has_predecessor) {
    if (wcslen(name)) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"name\":\"");
        PrintUtilities_print_json_string(file, name);
        fprintf(file, "\"");
        *has_predecessor = true;
    }
}

static void print_description(FILE* file, const wchar_t* description, bool* has_predecessor) {
    if (description) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"description\":\"");
        PrintUtilities_print_json_string(file, description);
        fprintf(file, "\"");
        *has_predecessor = true;
    }
}

static void print_steps(FILE* file, const Steps* steps, bool* has_predecessor) {
    if (steps->step_count) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"steps\":[");
        int i;
        for (i = 0; i < steps->step_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_step(file, &steps->steps[i]);
        }
        fprintf(file, "]");
        *has_predecessor = true;
    }
}

static void print_background(FILE* file, const Background* background) {
    fprintf(file, "{");
    fprintf(file, "\"background\": {");
    bool has_predecessor = false;
    print_location(file, &background->location, &has_predecessor);
    print_keyword(file, background->keyword, &has_predecessor);
    print_name(file, background->name, &has_predecessor);
    print_description(file, background->description, &has_predecessor);
    print_steps(file, background->steps, &has_predecessor);
    fprintf(file, "}");
    fprintf(file, "}");
}

static void print_tag(FILE* file, const Tag* tag) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_location(file, &tag->location, &has_predecessor);
    print_name(file, tag->name, &has_predecessor);
    fprintf(file, "}");
}

static void print_tags(FILE* file, const Tags* tags, bool* has_predecessor) {
    if (tags->tag_count) {
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

static void print_example_table_header(FILE* file, const TableRow* header, bool* has_predecessor) {
    if (header) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"tableHeader\":");
        print_table_row(file, header);
        *has_predecessor = true;
    }
}

static void print_example_table_body(FILE* file, const TableRows* body, bool* has_predecessor) {
    if (body && body->row_count) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"tableBody\":[");
        int i;
        for (i = 0; i < body->row_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_table_row(file, &body->table_rows[i]);
        }
        fprintf(file, "]");
        *has_predecessor = true;
    }
}

static void print_example_table(FILE* file, const ExampleTable* example_table) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_location(file, &example_table->location, &has_predecessor);
    print_keyword(file, example_table->keyword, &has_predecessor);
    print_name(file, example_table->name, &has_predecessor);
    print_description(file, example_table->description, &has_predecessor);
    print_tags(file, example_table->tags, &has_predecessor);
    print_example_table_header(file, example_table->table_header, &has_predecessor);
    print_example_table_body(file, example_table->table_body, &has_predecessor);
    fprintf(file, "}");
}

static void print_scenario(FILE* file, const Scenario* scenario) {
    fprintf(file, "{\"scenario\":{");
    bool has_predecessor = false;
    print_tags(file, scenario->tags, &has_predecessor);
    print_location(file, &scenario->location, &has_predecessor);
    print_keyword(file, scenario->keyword, &has_predecessor);
    print_name(file, scenario->name, &has_predecessor);
    print_description(file, scenario->description, &has_predecessor);
    print_steps(file, scenario->steps, &has_predecessor);
    fprintf(file, "}");
    fprintf(file, "}");
}

static void print_examples(FILE* file, const Examples* examples, bool* has_predecessor) {
    if (examples->example_count) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"examples\":[");
        int i;
        for (i = 0; i < examples->example_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_example_table(file, &examples->example_table[i]);
        }
        fprintf(file, "]");
        *has_predecessor = true;
    }
}

static void print_scenario_outline(FILE* file, const ScenarioOutline* scenario_outline) {
    fprintf(file, "{\"scenario\":{");
    bool has_predecessor = false;
    print_tags(file, scenario_outline->tags, &has_predecessor);
    print_location(file, &scenario_outline->location, &has_predecessor);
    print_keyword(file, scenario_outline->keyword, &has_predecessor);
    print_name(file, scenario_outline->name, &has_predecessor);
    print_description(file, scenario_outline->description, &has_predecessor);
    print_steps(file, scenario_outline->steps, &has_predecessor);
    print_examples(file, scenario_outline->examples, &has_predecessor);
    fprintf(file, "}");
    fprintf(file, "}");
}

static void print_comment(FILE* file, const Comment* comment) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_location(file, &comment->location, &has_predecessor);
    print_text(file, comment->text, &has_predecessor);
    fprintf(file, "}");
}

static void print_language(FILE* file, const wchar_t* language, bool* has_predecessor) {
    if (*has_predecessor) {
        fprintf(file, ",");
    }
    fprintf(file, "\"language\":\"");
    PrintUtilities_print_json_string(file, language);
    fprintf(file, "\"");
    *has_predecessor = true;
}

static void print_scenario_definitions(FILE* file, const ScenarioDefinitions* scenario_definitions, bool* has_predecessor) {
    if (scenario_definitions->scenario_definition_count) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"children\":[");
        int i;
        for (i = 0; i < scenario_definitions->scenario_definition_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            if (scenario_definitions->scenario_definitions[i]->type == Gherkin_Background) {
                print_background(file, (Background*)scenario_definitions->scenario_definitions[i]);
            }
            else if (scenario_definitions->scenario_definitions[i]->type == Gherkin_Scenario) {
                print_scenario(file, (Scenario*)scenario_definitions->scenario_definitions[i]);
            } else {
                print_scenario_outline(file, (ScenarioOutline*)scenario_definitions->scenario_definitions[i]);
            }
        }
        fprintf(file, "]");
        *has_predecessor = true;
    }
}

static void print_feature(FILE* file, const Feature* feature, bool* has_predecessor) {
    if (feature) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"feature\":{");
        bool has_predecessor_internal = false;
        print_tags(file, feature->tags, &has_predecessor_internal);
        print_location(file, &feature->location, &has_predecessor_internal);
        print_language(file, feature->language, &has_predecessor_internal);
        print_keyword(file, feature->keyword, &has_predecessor_internal);
        print_name(file, feature->name, &has_predecessor_internal);
        print_description(file, feature->description, &has_predecessor_internal);
        print_scenario_definitions(file, feature->scenario_definitions, &has_predecessor_internal);
        fprintf(file, "}\n");
        *has_predecessor = true;
    }
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

static void print_comments(FILE* file, const Comments* comments, bool* has_predecessor) {
    if (comments && comments->comment_count) {
        if (*has_predecessor) {
            fprintf(file, ",");
        }
        fprintf(file, "\"comments\":[");
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

void AstPrinter_print_gherkin_document(FILE* file, const GherkinDocument* gherkin_document, wchar_t* uri) {
    fprintf(file, "{");
    bool has_predecessor = false;
    print_uri(file, uri, &has_predecessor);
    print_feature(file, gherkin_document->feature, &has_predecessor);
    print_comments(file, gherkin_document->comments, &has_predecessor);
    fprintf(file, "}");
}
