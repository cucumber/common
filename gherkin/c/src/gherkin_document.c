#include "gherkin_document.h"
#include <stdlib.h>

const GherkinDocument* GherkinDocument_new(const Feature* feature, const Comments* comments) {
    GherkinDocument* gherkin_document = (GherkinDocument*)malloc(sizeof(GherkinDocument));
    gherkin_document->gherkin_document_delete = (item_delete_function)GherkinDocument_delete;
    gherkin_document->type = Gherkin_GherkinDocument;
    gherkin_document->feature = feature;
    gherkin_document->comments = comments;
    return gherkin_document;
}

void GherkinDocument_delete(const GherkinDocument* gherkin_document) {
    if (!gherkin_document) {
        return;
    }
    if (gherkin_document->feature) {
        Feature_delete(gherkin_document->feature);
    }
    if (gherkin_document->comments) {
        Comments_delete(gherkin_document->comments);
    }
    free((void*)gherkin_document);
}
