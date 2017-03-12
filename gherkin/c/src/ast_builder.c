#include "ast_builder.h"
#include "ast_node.h"
#include "item_queue.h"
#include "token.h"
#include "scenario.h"
#include "scenario_outline.h"
#include "data_table.h"
#include "doc_string.h"
#include "error_list.h"
#include <stdio.h>
#include <stdlib.h>

typedef struct AstBuilder {
    Builder builder;
    ItemQueue* stack;
    ItemQueue* comments;
    ErrorList* errors;
} AstBuilder;

typedef struct ExampleTableOnly {
    item_delete_function table_delete;
    GherkinAstType type;
    const TableRow* table_header;
    const TableRows* table_body;
} ExampleTableOnly;

typedef struct Description {
    item_delete_function description_delete;
    const wchar_t* text;
} Description;

static const ExampleTableOnly* ExampleTableOnly_new(const TableRow* table_header, const TableRows* table_body);

static void ExampleTableOnly_delete(const ExampleTableOnly* table);

static AstNode* current_node(AstBuilder* ast_builder);

static void* transform_node(AstNode* ast_node, AstBuilder* ast_builder);

static const Background* get_background(AstNode* ast_node);

static const ScenarioDefinitions* get_scenario_definitions(AstNode* ast_node);

static const Steps* get_steps(AstNode* ast_node);

static const StepArgument* get_step_argument(AstNode* ast_node);

static const Examples* get_examples(AstNode* ast_node);

static const TableRow* get_table_header(AstNode* ast_node);

static const TableRows* get_table_body(AstNode* ast_node);

static const TableCells* get_table_cells(Token* token);

static const Tags* get_tags(AstNode* ast_node);

static const wchar_t* get_description_text(AstNode* ast_node);

static const wchar_t* get_doc_string_text(AstNode* ast_node);

static wchar_t* create_multi_line_text_from_tokens(int text_length, int line_count, ItemQueue* line_queue);

static const wchar_t* get_description(AstNode* ast_node);

static const Comments* get_comments();

static void ensure_cell_count(ErrorList* errors, const TableRows* rows, const TableRow* header, AstNode* ast_node);

void AstBuilder_build(Builder* builder, Token* token);

void AstBuilder_reset(Builder* builder);

void AstBuilder_set_error_context(Builder* builder, ErrorList* error_context);

void AstBuilder_start_rule(Builder* builder, RuleType rule);

void AstBuilder_end_rule(Builder* builder, RuleType rule);

Builder* AstBuilder_new() {
    AstBuilder* builder = (AstBuilder*)malloc(sizeof(AstBuilder));
    builder->builder.build = &AstBuilder_build;
    builder->builder.reset = &AstBuilder_reset;
    builder->builder.set_error_context = &AstBuilder_set_error_context;
    builder->builder.start_rule = &AstBuilder_start_rule;
    builder->builder.end_rule = &AstBuilder_end_rule;
    builder->stack = 0;
    builder->comments = 0;
    builder->errors = 0;
    AstBuilder_reset((Builder*)builder);
    return (Builder*)builder;
}

void AstBuilder_delete(Builder* builder) {
    AstBuilder* ast_builder = (AstBuilder*)builder;
    if (ast_builder->stack) {
        ItemQueue_delete(ast_builder->stack);
    }
    if (ast_builder->comments) {
        ItemQueue_delete(ast_builder->comments);
    }
    free((void*)builder);
}

void AstBuilder_build(Builder* builder, Token* token) {
    if ((RuleType)token->matched_type == Rule_Comment) {
        ItemQueue_add(((AstBuilder*)builder)->comments, (Item*)token);
    }
    else if (current_node((AstBuilder*)builder)) {
        AstNode_add(current_node((AstBuilder*)builder), (RuleType)token->matched_type, token);
    }
}

void AstBuilder_reset(Builder* builder) {
    AstBuilder* ast_builder = (AstBuilder*)builder;
    if (ast_builder->stack) {
        ItemQueue_delete(ast_builder->stack);
    }
    if (ast_builder->comments) {
        ItemQueue_delete(ast_builder->comments);
    }
    ast_builder->stack = ItemQueue_new();
    ItemQueue_push(ast_builder->stack, (Item*)AstNode_new(Rule_None));
    ast_builder->comments = ItemQueue_new();
}

void AstBuilder_set_error_context(Builder* builder, ErrorList* error_context) {
    AstBuilder* ast_builder = (AstBuilder*)builder;
    ast_builder->errors = error_context;
}

void AstBuilder_start_rule(Builder* builder, RuleType rule) {
    ItemQueue_push(((AstBuilder*)builder)->stack, (Item*)AstNode_new(rule));
}

void AstBuilder_end_rule(Builder* builder, RuleType rule) {
    AstNode* ast_node = (AstNode*)ItemQueue_pop(((AstBuilder*)builder)->stack);
    void* object = transform_node(ast_node, (AstBuilder*)builder);
    AstNode_add(((AstNode*)ItemQueue_peek(((AstBuilder*)builder)->stack)), rule, object);
}

const GherkinDocument* AstBuilder_get_result(Builder* builder) {
    return (const GherkinDocument*)AstNode_get_single(current_node((AstBuilder*)builder), Rule_GherkinDocument);
}

static AstNode* current_node(AstBuilder* ast_builder) {
    return (AstNode*)ItemQueue_peek(ast_builder->stack);
}

static void* transform_node(AstNode* ast_node, AstBuilder* ast_builder) {
    Token* token;
    AstNode* node;
    switch (ast_node->rule_type) {
    case Rule_Step: {
        token = AstNode_get_token(ast_node, Token_StepLine);
        const Step* step = Step_new(token->location, token->matched_keyword, token->matched_text, get_step_argument(ast_node));
        Token_delete(token);
        AstNode_delete(ast_node);
        return (void*)step;
    }
    case Rule_DataTable: {
        const TableRows* rows = get_table_body(ast_node);
        ensure_cell_count(ast_builder->errors, rows, 0, ast_node);
        const DataTable* data_table = DataTable_new(rows->table_rows[0].location, rows);
        AstNode_delete(ast_node);
        return (void*)data_table;
    }
    case Rule_DocString: {
        token = AstNode_get_token(ast_node, Token_DocStringSeparator);
        const DocString* doc_string = DocString_new(token->location, token->matched_text, get_doc_string_text(ast_node));
        Token_delete(token);
        AstNode_delete(ast_node);
        return (void*)doc_string;
    }
    case Rule_Background: {
        token = (Token*)AstNode_get_single(ast_node, Rule_BackgroundLine);
        const Background* background = Background_new(token->location, token->matched_keyword, token->matched_text, get_description(ast_node), get_steps(ast_node));
        Token_delete(token);
        AstNode_delete(ast_node);
        return (void*)background;
    }
    case Rule_Scenario_Definition: {
        node = AstNode_get_single(ast_node, Rule_Scenario);
        if (node) {
            token = AstNode_get_token(node, Token_ScenarioLine);
            const Scenario* scenario = Scenario_new(token->location, token->matched_keyword, token->matched_text, get_description(node), get_tags(ast_node), get_steps(node));
            Token_delete(token);
            AstNode_delete(node);
            AstNode_delete(ast_node);
            return (void*)scenario;
        }
        else {
            node = AstNode_get_single(ast_node, Rule_ScenarioOutline);
            if (!node) {
                ErrorList_internal_grammar_error(ast_builder->errors);
            }
            token = AstNode_get_token(node, Token_ScenarioOutlineLine);
            const ScenarioOutline* scenario_outline = ScenarioOutline_new(token->location, token->matched_keyword, token->matched_text, get_description(node), get_tags(ast_node), get_steps(node), get_examples(node));
            Token_delete(token);
            AstNode_delete(node);
            AstNode_delete(ast_node);
            return (void*)scenario_outline;
        }
    }
    case Rule_Examples_Definition: {
        node = AstNode_get_single(ast_node, Rule_Examples);
        token = AstNode_get_token(node, Token_ExamplesLine);
        const ExampleTableOnly* table = (ExampleTableOnly*)AstNode_get_single(node, Rule_Examples_Table);
        const TableRow* header = table ? table->table_header : 0;
        const TableRows* body = table ? table->table_body : 0;
        const ExampleTable* example_table = ExampleTable_new(token->location, token->matched_keyword, token->matched_text, get_description(node), get_tags(ast_node), header, body);
        ExampleTableOnly_delete(table);
        Token_delete(token);
        AstNode_delete(node);
        AstNode_delete(ast_node);
        return (void*)example_table;
    }
    case Rule_Examples_Table: {
        const TableRow* header = get_table_header(ast_node);
        const TableRows* body = get_table_body(ast_node);
        ensure_cell_count(ast_builder->errors, body, header, ast_node);
        const ExampleTableOnly* table = ExampleTableOnly_new(header, body);
        AstNode_delete(ast_node);
        return (void*) table;
    }
    case Rule_Description: {
        const wchar_t* text = get_description_text(ast_node);
        Description* description = (Description*)malloc(sizeof(Description));
        description->description_delete = (item_delete_function)free;
        description->text = text;
        AstNode_delete(ast_node);
        return (void*)description;
    }
    case Rule_Feature: {
        node = AstNode_get_single(ast_node, Rule_Feature_Header);
        if (!node) {
            return (void*)0;
        }
        token = AstNode_get_token(node, Token_FeatureLine);
        if (!token) {
            return (void*)0;
        }
        const Feature* feature = Feature_new(token->location, token->matched_language, token->matched_keyword, token->matched_text, get_description(node), get_tags(node), get_scenario_definitions(ast_node));
        Token_delete(token);
        AstNode_delete(node);
        AstNode_delete(ast_node);
        return (void*)feature;
    }
    case Rule_GherkinDocument: {
        const Feature* feature = AstNode_get_single(ast_node, Rule_Feature);
        const GherkinDocument* gherkin_document = GherkinDocument_new(feature, get_comments(ast_builder));
        AstNode_delete(ast_node);
        return (void*)gherkin_document;
    }
    default:
        return (void*)ast_node;
    }
}

static const ScenarioDefinitions* get_scenario_definitions(AstNode* ast_node) {
    ItemQueue* scenario_definitions_queue = AstNode_get_items(ast_node, Rule_Scenario_Definition);
    const Background* background = get_background(ast_node);
    int background_count = background ? 1 : 0;
    ScenarioDefinitions* scenario_definitions = (ScenarioDefinitions*)malloc(sizeof(ScenarioDefinitions));
    scenario_definitions->scenario_definition_count = background_count + ItemQueue_size(scenario_definitions_queue);
    scenario_definitions->scenario_definitions = 0;
    if (scenario_definitions->scenario_definition_count > 0) {
        scenario_definitions->scenario_definitions = (ScenarioDefinition**)malloc(scenario_definitions->scenario_definition_count * sizeof(ScenarioDefinition*));
        int i;
        if (background) {
            scenario_definitions->scenario_definitions[0] = (ScenarioDefinition*)background;
        }
        for (i = background_count; i < scenario_definitions->scenario_definition_count; ++i) {
            scenario_definitions->scenario_definitions[i] = (ScenarioDefinition*)ItemQueue_remove(scenario_definitions_queue);
        }
    }
    return scenario_definitions;
}

static const Background* get_background(AstNode* ast_node) {
    if (!ItemQueue_is_empty(&ast_node->item_queues[Rule_Background])) {
        return (Background*)AstNode_get_single(ast_node, Rule_Background);
    }
    return (Background*)0;
}

static const Steps* get_steps(AstNode* ast_node) {
    ItemQueue* steps_queue = AstNode_get_items(ast_node, Rule_Step);
    Steps* steps = (Steps*)malloc(sizeof(Steps));
    steps->step_count = ItemQueue_size(steps_queue);
    steps->steps = 0;
    if (steps->step_count > 0) {
        steps->steps = (Step*)malloc(steps->step_count * sizeof(Step));
        int i;
        for (i = 0; i < steps->step_count; ++i) {
            Step_transfer(&steps->steps[i], (Step*)ItemQueue_remove(steps_queue));
        }
    }
    return steps;
}

static const StepArgument* get_step_argument(AstNode* ast_node) {
    StepArgument* argument = AstNode_get_single(ast_node, Rule_DataTable);
    if (!argument) {
        argument = AstNode_get_single(ast_node, Rule_DocString);
    }
    return argument;
}

static const Examples* get_examples(AstNode* ast_node) {
    ItemQueue* examples_queue = AstNode_get_items(ast_node, Rule_Examples_Definition);
    Examples* examples = (Examples*)malloc(sizeof(Examples));
    examples->example_count = ItemQueue_size(examples_queue);
    examples->example_table = 0;
    if (examples->example_count > 0) {
        examples->example_table = (ExampleTable*)malloc(examples->example_count * sizeof(ExampleTable));
        int i;
        for (i = 0; i < examples->example_count; ++i) {
            ExampleTable_transfer(&examples->example_table[i], (ExampleTable*)ItemQueue_remove(examples_queue));
        }
    }
    return examples;
}

static const TableRow* get_table_header(AstNode* ast_node) {
    ItemQueue* table_rows_queue = AstNode_get_items(ast_node, Rule_TableRow);
    if (!ItemQueue_is_empty(table_rows_queue)) {
        Token* token = (Token*)ItemQueue_remove(table_rows_queue);
        const TableRow* table_row = TableRow_new(token->location, get_table_cells(token));
        Token_delete(token);
        return table_row;
    }
    return (const TableRow*)0;
}

static const TableRows* get_table_body(AstNode* ast_node) {
    ItemQueue* table_rows_queue = AstNode_get_items(ast_node, Rule_TableRow);
    TableRows* table_rows = (TableRows*)malloc(sizeof(TableRows));
    table_rows->row_count = ItemQueue_size(table_rows_queue);
    table_rows->table_rows = 0;
    if (table_rows->row_count > 0) {
        table_rows->table_rows = (TableRow*)malloc(table_rows->row_count * sizeof(TableRow));
        Token* token;
        int i;
        for (i = 0; i < table_rows->row_count; ++i) {
            token = (Token*)ItemQueue_remove(table_rows_queue);
            TableRow_transfer(&table_rows->table_rows[i], (TableRow*)TableRow_new(token->location, get_table_cells(token)));
            Token_delete(token);
        }
    }
    return table_rows;
}

static void ensure_cell_count(ErrorList* errors, const TableRows* rows, const TableRow* header, AstNode* ast_node) {
    if (!rows || rows->row_count == 0) {
        return;
    }
    int cell_count = header ? header->table_cells->cell_count : rows->table_rows[0].table_cells->cell_count;
    int i;
    for (i = 0; i < rows->row_count; ++i) {
        if (rows->table_rows[i].table_cells->cell_count != cell_count) {
            Location error_location = {rows->table_rows[i].location.line, rows->table_rows[i].location.column};
            TableRow_delete(header);
            TableRows_delete(rows);
            AstNode_delete(ast_node);
            ErrorList_add_inconsisten_cell_count_error(errors, error_location);
        }
    }
}

static const TableCells* get_table_cells(Token* token) {
    TableCells* table_cells = (TableCells*)malloc(sizeof(TableCells));
    table_cells->cell_count = token->matched_items->count;
    table_cells->table_cells = 0;
    if (table_cells->cell_count > 0) {
        table_cells->table_cells = (TableCell*)malloc(table_cells->cell_count * sizeof(TableCell));
        Location location;
        location.line = token->location.line;
        int i;
        for (i = 0; i < table_cells->cell_count; ++i) {
            location.column = token->matched_items->items[i].column;
            TableCell_transfer(&table_cells->table_cells[i], (TableCell*)TableCell_new(location, token->matched_items->items[i].text));
        }
    }
    return table_cells;
}

static const Tags* get_tags(AstNode* ast_node) {
    AstNode* tags_node = AstNode_get_single(ast_node, Rule_Tags);
    Tags* tags = (Tags*)malloc(sizeof(Tags));
    if (!tags_node) {
        tags->tag_count = 0;
        tags->tags = 0;
        return tags;
    }
    int tag_count = 0;
    ItemQueue* tags_queue = AstNode_get_items(tags_node, Rule_TagLine);
    QueueItem* queue_item = tags_queue->first;
    while (queue_item) {
        tag_count += ((Token*)queue_item->item)->matched_items->count;
        queue_item = queue_item->next;
    }
    tags->tag_count = tag_count;
    tags->tags = 0;
    if (tags->tag_count > 0) {
        tags->tags = (Tag*)malloc(tags->tag_count * sizeof(Tag));
        int tag_index = 0;
        Token* token;
        Location location;
        while (!ItemQueue_is_empty(tags_queue)) {
            token = (Token*)ItemQueue_remove(tags_queue);
            location.line = token->location.line;
            int i;
            for (i = 0; i < token->matched_items->count; ++i) {
                location.column = token->matched_items->items[i].column;
                Tag_transfer(&tags->tags[tag_index++], location, &token->matched_items->items[i].text);
            }
            Token_delete(token);
        }
    }
    AstNode_delete(tags_node);
    return tags;
}

static const wchar_t* get_description_text(AstNode* ast_node) {
    ItemQueue* line_queue = AstNode_get_items(ast_node, Rule_Other);
    int text_length = 0;
    QueueItem* queue_item = line_queue->first;
    int line_count = 0;
    int current_line = 0;
    while (queue_item) {
        ++current_line;
        if (!GherkinLine_is_empty(((Token*)queue_item->item)->line)) {
            line_count = current_line;
            text_length += wcslen(((Token*)queue_item->item)->matched_text);
        }
        queue_item = queue_item->next;
    }
    text_length += line_count;
    return create_multi_line_text_from_tokens(text_length, line_count, line_queue);
}

static const wchar_t* get_doc_string_text(AstNode* ast_node) {
    ItemQueue* line_queue = AstNode_get_items(ast_node, Rule_Other);
    int text_length = 0;
    QueueItem* queue_item = line_queue->first;
    while (queue_item) {
        text_length += wcslen(((Token*)queue_item->item)->matched_text) + 1;
        queue_item = queue_item->next;
    }
    int line_count = ItemQueue_size(line_queue);
    return create_multi_line_text_from_tokens(text_length, line_count, line_queue);
}

static wchar_t* create_multi_line_text_from_tokens(int text_length, int line_count, ItemQueue* line_queue) {
    if (text_length == 0) {
        return (wchar_t*)0;
    }
    wchar_t* text = (wchar_t*)malloc(text_length * sizeof(wchar_t));
    int current_pos = 0;
    Token* token;
    int i;
    for (i = 0; i < line_count; ++i) {
        token = (Token*)ItemQueue_remove(line_queue);
        int length = wcslen(token->matched_text);
        wmemcpy(&text[current_pos], token->matched_text, length);
        text[current_pos + length] = L'\n';
        current_pos += length + 1;
        Token_delete(token);
    }
    text[text_length - 1] = L'\0';
    return text;
}

static const wchar_t* get_description(AstNode* ast_node) {
    Description* description = AstNode_get_single(ast_node, Rule_Description);
    if (!description) {
        return (wchar_t*)0;
    }
    const wchar_t* text = description->text;
    free((void*)description);
    return text;
}

static const Comments* get_comments(AstBuilder* ast_builder) {
    Comments* comments = (Comments*)malloc(sizeof(Comments));
    comments->comment_count = ItemQueue_size(ast_builder->comments);
    comments->comments = 0;
    if (comments->comment_count > 0) {
        comments->comments = (Comment*)malloc(comments->comment_count * sizeof(Comment));
        int i;
        for (i = 0; i < comments->comment_count; ++i) {
            Token* token = (Token*)ItemQueue_remove(ast_builder->comments);
            Comment_transfer(&comments->comments[i], Comment_new(token->location, token->matched_text));
            Token_delete(token);
        }
    }
    return comments;
}

static const ExampleTableOnly* ExampleTableOnly_new(const TableRow* table_header, const TableRows* table_body) {
    ExampleTableOnly* table = (ExampleTableOnly*)malloc(sizeof(ExampleTableOnly));
    table->table_delete = (item_delete_function)ExampleTableOnly_delete;
    table->type = -1;
    table->table_header = table_header;
    table->table_body = table_body;
    return table;
}

static void ExampleTableOnly_delete(const ExampleTableOnly* table) {
    free((void*)table);
}
