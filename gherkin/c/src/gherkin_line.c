#include "gherkin_line.h"
#include "dialect.h"
#include "string_utilities.h"
#include <stdlib.h>

typedef const wchar_t* (*find_delimiter_function) (const wchar_t*);

static wchar_t* copy_trimmed_text(const wchar_t* trimmed_text, int prefix_length);

static const wchar_t* find_cell_delimiter(const wchar_t* current_pos);

static const wchar_t* find_tag_char(const wchar_t* current_pos);

static int calculate_cell_count(const wchar_t* text);

static int calculate_tag_count(const wchar_t* text);

static int calculate_item_count(const wchar_t* text, find_delimiter_function find_delimiter);

static const wchar_t* populate_cell_data(Span* items, const wchar_t* current_pos, int start_indent);

static const wchar_t* populate_tag_data(Span* items, const wchar_t* current_pos, int start_indent);


const GherkinLine* GherkinLine_new(const wchar_t* line_text, int line_number) {
    GherkinLine* line = (GherkinLine*)malloc(sizeof(GherkinLine));
    line->line_number = line_number;
    line->indent = 0;
    line->line_text = line_text;
    line->trimmed_line = line_text;
    while (line->trimmed_line[0] != '\0' && line->trimmed_line[0] == L' ') {
        ++line->trimmed_line;
        ++line->indent;
    }
    return line;
}

void GherkinLine_delete(const GherkinLine* line) {
    if (!line) {
        return;
    }
    if (line->line_text)
        free((void*)line->line_text);
    free((void*)line);
}

bool GherkinLine_is_empty(const GherkinLine* line) {
    return wcslen(line->trimmed_line) == 0;
}

bool GherkinLine_start_with(const GherkinLine* line, const wchar_t* prefix) {
    if (wcsncmp(prefix, line->trimmed_line, wcslen(prefix)) == 0)
        return true;
    return false;

}

bool GherkinLine_start_with_title_keyword(const GherkinLine* line, const wchar_t* keyword) {
    if (GherkinLine_start_with(line, keyword) && line->trimmed_line[wcslen(keyword)] == L':')
        return true;
    return false;
}

wchar_t* GherkinLine_copy_rest_trimmed(const GherkinLine* line, int length) {
    return copy_trimmed_text(line->trimmed_line, length);
}

wchar_t* GherkinLine_copy_line_text(const GherkinLine* line, int indent_to_remove) {
    if (indent_to_remove < 0 || indent_to_remove > line->indent)
        return StringUtilities_copy_string(line->trimmed_line);
    const wchar_t* text_start = line->line_text + indent_to_remove;
    return StringUtilities_copy_string(text_start);
}

const Items* GherkinLine_table_cells(const GherkinLine* line) {
    int item_count = calculate_cell_count(line->trimmed_line);
    if (item_count == 0)
        return (Items*)0;
    Span* items = (Span*)malloc(item_count * sizeof(Span));
    int i;
    for (i = 0; i < item_count; ++i) {
        items[i].column = 0;
        items[i].text = 0;
    }
    Items* item_array = (Items*)malloc(sizeof(Items));
    item_array->count = item_count;
    item_array->items = items;
    const wchar_t* current_pos = line->trimmed_line;
    for (i = 0; i < item_count; ++i) {
        current_pos = populate_cell_data(&items[i], current_pos, current_pos - line->line_text);
        if (!current_pos)
            break;
    }
    return item_array;
}

const Items* GherkinLine_tags(const GherkinLine* line) {
    int item_count = calculate_tag_count(line->trimmed_line);
    if (item_count == 0)
        return (Items*)0;
    Span* items = (Span*)malloc(item_count * sizeof(Span));
    int i;
    for (i = 0; i < item_count; ++i) {
        items[i].column = 0;
        items[i].text = 0;
    }
    Items* item_array = (Items*)malloc(sizeof(Items));
    item_array->count = item_count;
    item_array->items = items;
    const wchar_t* current_pos = line->trimmed_line;
    for (i = 0; i < item_count; ++i) {
        current_pos = populate_tag_data(&items[i], current_pos, current_pos - line->line_text);
        if (!current_pos)
            break;
    }
    return item_array;
}

bool GherkinLine_is_language_line(const GherkinLine* line) {
    const wchar_t* current_pos = line->trimmed_line;
    if (*current_pos != L'#')
        return false;
    ++current_pos;
    while (*current_pos != '\0' && *current_pos == L' ')
        ++current_pos;
    if (wcsncmp(L"language", current_pos, 8) != 0)
        return false;
    current_pos += 8;
    while (*current_pos != L'\0' && *current_pos == L' ')
        ++current_pos;
    if (*current_pos != L':')
        return false;
    return true;
}

const wchar_t* GherkinLine_get_language(const GherkinLine* line) {
    const wchar_t* start = line->trimmed_line;
    while (*start != L'\0' && *start != L':')
        ++start;
    ++start;
    while (*start != L'\0' && *start == L' ')
        ++start;
    const wchar_t* end = start;
    while (*end != L'\0' && *end != L' ')
        ++end;
    return StringUtilities_copy_string_part(start, end - start);
}

static wchar_t* copy_trimmed_text(const wchar_t* text, int prefix_length) {
    const wchar_t* text_start = text + prefix_length;
    while (*text_start != L'\0' && *text_start == L' ') {
        ++text_start;
    }
    const wchar_t* text_end = text_start + wcslen(text_start);
    while (text_end > text_start && *(text_end - 1) == L' ') {
        --text_end;
    }
    return StringUtilities_copy_string_part(text_start, text_end - text_start);
}

static const wchar_t* find_cell_delimiter(const wchar_t* start_pos) {
    const wchar_t* current_pos = start_pos;
    while (*current_pos != L'\0') {
        if (*current_pos == L'|')
            return current_pos;
        if (*current_pos == L'\\')
            ++current_pos;
        ++current_pos;
    }
    return 0;
}

static const wchar_t* find_tag_char(const wchar_t* start_pos) {
    const wchar_t* current_pos = start_pos;
    while (*current_pos != L'\0') {
        if (*current_pos == L'@')
            return current_pos;
        ++current_pos;
    }
    return current_pos;
}

static int calculate_cell_count(const wchar_t* text) {
    int deliminater_count = calculate_item_count(text, &find_cell_delimiter);
    return deliminater_count > 0 ? deliminater_count - 1 : 0;
}

static int calculate_tag_count(const wchar_t* text) {
    return calculate_item_count(text, &find_tag_char);
}

static int calculate_item_count(const wchar_t* text, find_delimiter_function find_delimiter) {
    int deliminater_count = 0;
    const wchar_t* current_char = text;
    while (current_char && *current_char != L'\0') {
        current_char = find_delimiter(current_char);
        if (current_char && *current_char != L'\0') {
            ++deliminater_count;
            ++current_char;
        }
    }
    return deliminater_count;
}

static const wchar_t* populate_cell_data(Span* item, const wchar_t* start_pos, int start_indent) {
    const wchar_t* current_pos = find_cell_delimiter(start_pos);
    if (!current_pos || *current_pos == L'\0')
        return 0;
    const wchar_t* end_pos = find_cell_delimiter(current_pos + 1);
    const wchar_t* end_text = end_pos;
    if (!end_pos || *end_pos == L'\0')
        return 0;
    ++current_pos;
    while (current_pos < end_pos && *current_pos == L' ')
        ++current_pos;
    while (end_text > current_pos && *(end_text - 1) == L' ')
        --end_text;
    item->column = start_indent + (current_pos - start_pos) + 1;
    int text_length = end_text - current_pos;
    wchar_t* text = StringUtilities_copy_string_part(current_pos, text_length);
    const wchar_t* from = text;
    wchar_t* to = text;
    while (*from != L'\0') {
        if (*from == L'\\') {
            ++from;
            if (*from == L'n') {
                *to++ = L'\n';
                ++from;
            } else {
                if (*from != L'|' && *from != L'\\') {
                    *to++ = L'\\';
                }
                if (*from != L'\0') {
                    *to++ = *from++;
                }
            }
        } else {
            *to++ = *from++;
        }
    }
    *to = L'\0';
    item->text = text;
    return end_pos;
}

static const wchar_t* populate_tag_data(Span* item, const wchar_t* start_pos, int start_indent) {
    const wchar_t* current_pos = find_tag_char(start_pos);
    if (!current_pos || *current_pos == L'\0')
        return 0;
    const wchar_t* end_pos = find_tag_char(current_pos + 1);
    const wchar_t* end_text = end_pos;
    while (end_text > current_pos && *(end_text - 1) == L' ')
        --end_text;
    item->column = start_indent + (current_pos - start_pos) + 1;
    int text_length = end_text - current_pos;
    if (text_length > 0) {
        item->text = StringUtilities_copy_string_part(current_pos, text_length);
    }
    return end_pos;
}
