#ifndef GHERKIN_GHERKIN_DOCUMENT_H_
#define GHERKIN_GHERKIN_DOCUMENT_H_

#include <wchar.h>
#include "ast.h"
#include "feature.h"
#include "comment.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct GherkinDocument {
    item_delete_function gherkin_document_delete;
    GherkinAstType type;
    wchar_t* uri;
    const Feature* feature;
    const Comments* comments;
} GherkinDocument;

GherkinDocument* GherkinDocument_new(const Feature* feature, const Comments* comments);

void GherkinDocument_delete(const GherkinDocument* gherkin_document);

void GherkinDocument_set_uri(GherkinDocument* gherkin_document, const char* uri);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_GHERKIN_DOCUMENT_H_ */
