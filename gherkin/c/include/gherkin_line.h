#ifndef GHERKIN_GHERKIN_LINE_H_
#define GHERKIN_GHERKIN_LINE_H_

#include <stdbool.h>
#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct GherkinLine {
    int line_number;
    int indent;
    const wchar_t* line_text;
    const wchar_t* trimmed_line;
} GherkinLine;

typedef struct Span {
    int column;
    wchar_t* text;
} Span;

typedef struct Items {
    int count;
    Span* items;
} Items;

const GherkinLine* GherkinLine_new(const wchar_t* line_text, int line_number);

void GherkinLine_delete(const GherkinLine* line);

bool GherkinLine_start_with(const GherkinLine* line, const wchar_t* prefix);

bool GherkinLine_start_with_title_keyword(const GherkinLine* line, const wchar_t* keyword);

bool GherkinLine_is_empty(const GherkinLine* line);

wchar_t* GherkinLine_copy_rest_trimmed(const GherkinLine* line, int length);

wchar_t* GherkinLine_copy_line_text(const GherkinLine* line, int indent_to_remove);

const Items* GherkinLine_table_cells(const GherkinLine* line);

const Items* GherkinLine_tags(const GherkinLine* line);

bool GherkinLine_is_language_line(const GherkinLine* line);

const wchar_t* GherkinLine_get_language(const GherkinLine* line);


#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_GHERKIN_LINE_H_ */
