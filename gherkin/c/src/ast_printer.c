#include "ast_printer.h"
#include "feature.h"
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

static const wchar_t* ast_item_type_to_string(GherkinAstType type) {
    switch (type) {
    case Gherkin_GherkinDocument:
        return L"GherkinDocument";
    case Gherkin_Feature:
        return L"Feature";
    case Gherkin_Background:
        return L"Background";
    case Gherkin_Scenario:
        return L"Scenario";
    case Gherkin_Rule:
        return L"Rule";
    case Gherkin_Step:
        return L"Step";
    case Gherkin_DataTable:
        return L"DataTable";
    case Gherkin_DocString:
        return L"DocString";
    case Gherkin_Examples:
        return L"Examples";
    case Gherkin_TableRow:
        return L"TableRow";
    case Gherkin_TableCell:
        return L"TableCell";
    case Gherkin_Tag:
        return L"Tag";
    case Gherkin_Comment:
        return L"Comment";
    }
    return L"";
}

static void print_location(FILE* file, const Location* location) {
    fprintf(file, "\"location\":{");
    fprintf(file, "\"line\":%d,", location->line);
    fprintf(file, "\"column\":%d", location->column);
    fprintf(file, "},");
}

static void print_table_cell(FILE* file, const TableCell* table_cell) {
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(table_cell->type));
    print_location(file, &table_cell->location);
    fprintf(file, "\"value\":\"");
    if (table_cell->value) {
        PrintUtilities_print_json_string(file, table_cell->value);
    }
    fprintf(file, "\"}");
}

static void print_table_row(FILE* file, const TableRow* table_row) {
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(table_row->type));
    print_location(file, &table_row->location);
    fprintf(file, "\"cells\":[");
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
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(data_table->type));
    print_location(file, &data_table->location);
    fprintf(file, "\"rows\":[");
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
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(doc_string->type));
    print_location(file, &doc_string->location);
    if (doc_string->content_type) {
        fprintf(file, "\"contentType\":\"");
        PrintUtilities_print_json_string(file, doc_string->content_type);
        fprintf(file, "\",");
    }
    fprintf(file, "\"content\":\"");
    if (doc_string->content) {
        PrintUtilities_print_json_string(file, doc_string->content);
    }
    fprintf(file, "\"}");
}

static void print_keyword(FILE* file, const wchar_t* keyword) {
    fprintf(file, "\"keyword\":\"");
    PrintUtilities_print_json_string(file, keyword);
    fprintf(file, "\",");
}

static void print_text(FILE* file, const wchar_t* text) {
    fprintf(file, "\"text\":\"");
    PrintUtilities_print_json_string(file, text);
    fprintf(file, "\"");
}

static void print_step(FILE* file, const Step* step) {
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(step->type));
    print_location(file, &step->location);
    print_keyword(file, step->keyword);
    print_text(file, step->text);
    if (step->argument) {
        fprintf(file, ",\"argument\":");
        if (step->argument->type == Gherkin_DataTable) {
            print_data_table(file, (DataTable*)step->argument);
        }
        else if (step->argument->type == Gherkin_DocString) {
            print_doc_string(file, (DocString*)step->argument);
        }
    }
    fprintf(file, "}");
}

static void print_name(FILE* file, const wchar_t* name) {
    fprintf(file, "\"name\":\"");
    PrintUtilities_print_json_string(file, name);
    fprintf(file, "\",");
}

static void print_description(FILE* file, const wchar_t* description) {
    if (description) {
        fprintf(file, "\"description\":\"");
        PrintUtilities_print_json_string(file, description);
        fprintf(file, "\",");
    }
}

static void print_background(FILE* file, const Background* background) {
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(background->type));
    print_location(file, &background->location);
    print_keyword(file, background->keyword);
    print_name(file, background->name);
    print_description(file, background->description);
    fprintf(file, "\"steps\":[");
    int i;
    for (i = 0; i < background->steps->step_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_step(file, &background->steps->steps[i]);
    }
    fprintf(file, "]}");
}

static void print_tag(FILE* file, const Tag* tag) {
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(tag->type));
    print_location(file, &tag->location);
    fprintf(file, "\"name\":\"");
    PrintUtilities_print_json_string(file, tag->name);
    fprintf(file, "\"}");
}

static void print_example_table(FILE* file, const ExampleTable* example_table) {
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(example_table->type));
    print_location(file, &example_table->location);
    print_description(file, example_table->description);
    print_keyword(file, example_table->keyword);
    print_name(file, example_table->name);
    fprintf(file, "\"tags\":[");
    int i;
    for (i = 0; i < example_table->tags->tag_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_tag(file, &example_table->tags->tags[i]);
    }
    fprintf(file, "]");
    if (example_table->table_header) {
        fprintf(file, ",");
        fprintf(file, "\"tableHeader\":");
        print_table_row(file, example_table->table_header);
        fprintf(file, ",");
    }
    if (example_table->table_body) {
        fprintf(file, "\"tableBody\":[");
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
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(scenario->type));
    fprintf(file, "\"tags\":[");
    int i;
    for (i = 0; i < scenario->tags->tag_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_tag(file, &scenario->tags->tags[i]);
    }
    fprintf(file, "],");
    print_location(file, &scenario->location);
    print_keyword(file, scenario->keyword);
    print_name(file, scenario->name);
    print_description(file, scenario->description);
    fprintf(file, "\"steps\":[");
    for (i = 0; i < scenario->steps->step_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_step(file, &scenario->steps->steps[i]);
    }
    fprintf(file, "],");
    fprintf(file, "\"examples\":[");
    for (i = 0; i < scenario->examples->example_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_example_table(file, &scenario->examples->example_table[i]);
    }
    fprintf(file, "]}");
}

static void print_comment(FILE* file, const Comment* comment) {
    fprintf(file, "{\"type\":\"%ls\",", ast_item_type_to_string(comment->type));
    print_location(file, &comment->location);
    print_text(file, comment->text);
    fprintf(file, "}");
}

void print_scenario_definitions(FILE* file, const ScenarioDefinitions* scenario_definitions)
{
    int i;
    for (i = 0; i < scenario_definitions->scenario_definition_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        if (scenario_definitions->scenario_definitions[i]->type == Gherkin_Background) {
            print_background(file, (Background*)scenario_definitions->scenario_definitions[i]);
        } else {
            print_scenario(file, (Scenario*)scenario_definitions->scenario_definitions[i]);
        }
    }
}

void print_rule(FILE* file, const Rule* rule)
{
    fprintf(file, "{");
    fprintf(file, "\"type\":\"%ls\",", ast_item_type_to_string(rule->type));
    print_location(file, &rule->location);
    //print_keyword(file, rule->keyword);
    //print_name(file, rule->name);
    print_description(file, rule->description);
    fprintf(file, "\"children\":[");
    print_scenario_definitions(file, rule->scenario_definitions);
    fprintf(file, "]");
    fprintf(file, "}\n");
}

void print_rules(FILE* file, const Rules* rules)
{
    for (int i = 0; i < rules->rule_count; ++i)
    {
        if (i > 0)
            fprintf(file, ",");

        print_rule(file, rules->rules[i]);
    }
}

void print_feature(FILE* file, const Feature* feature) {
    fprintf(file, "{");
    fprintf(file, "\"type\":\"%ls\",", ast_item_type_to_string(feature->type));
    fprintf(file, "\"tags\":[");
    int i;
    for (i = 0; i < feature->tags->tag_count; ++i) {
        if (i > 0) {
            fprintf(file, ",");
        }
        print_tag(file, &feature->tags->tags[i]);
    }
    fprintf(file, "],");
    print_location(file, &feature->location);
    fprintf(file, "\"language\":\"");
    PrintUtilities_print_json_string(file, feature->language);
    fprintf(file, "\",");
    print_keyword(file, feature->keyword);
    print_name(file, feature->name);
    print_description(file, feature->description);
    fprintf(file, "\"children\":[");
    print_scenario_definitions(file, feature->scenario_definitions);
    if (feature->scenario_definitions->scenario_definition_count > 0 && feature->rules->rule_count > 0)
    {
        fprintf(file, ",");
    }
    print_rules(file, feature->rules);
    fprintf(file, "]");
    fprintf(file, "}\n");
}

void AstPrinter_print_gherkin_document(FILE* file, const GherkinDocument* gherkin_document) {
    fprintf(file, "{");
    fprintf(file, "\"type\":\"%ls\",", ast_item_type_to_string(gherkin_document->type));
    if (gherkin_document->feature) {
        fprintf(file, "\"feature\":");
        print_feature(file, gherkin_document->feature);
        fprintf(file, ",");
    }
    fprintf(file, "\"comments\":[");
    if (gherkin_document->comments) {
        int i;
        for (i = 0; i < gherkin_document->comments->comment_count; ++i) {
            if (i > 0) {
                fprintf(file, ",");
            }
            print_comment(file, &gherkin_document->comments->comments[i]);
        }
    }
    fprintf(file, "]");
    fprintf(file, "}");
}
