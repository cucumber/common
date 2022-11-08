#include "gherkin_document_event.h"
#include "ast_printer.h"
#include "print_utilities.h"
#include <string.h>
#include <stdlib.h>

static void GherkinDocumentEvent_delete(const Event* event);

static void GherkinDocumentEvent_print(const Event* event, FILE* file);

const GherkinDocumentEvent* GherkinDocumentEvent_new(const GherkinDocument* gherkin_document) {
    GherkinDocumentEvent* gherkin_document_event = (GherkinDocumentEvent*)malloc(sizeof(GherkinDocumentEvent));
    gherkin_document_event->event.event_delete = &GherkinDocumentEvent_delete;
    gherkin_document_event->event.event_print = &GherkinDocumentEvent_print;
    gherkin_document_event->event.event_type = Gherkin_GherkinDocumentEvent;
    gherkin_document_event->gherkin_document = gherkin_document;
    return gherkin_document_event;
}

static void GherkinDocumentEvent_delete(const Event* event) {
    if (!event || event->event_type != Gherkin_GherkinDocumentEvent) {
        return;
    }
    const GherkinDocumentEvent* gherkin_document_event = (const GherkinDocumentEvent*)event;
    if (gherkin_document_event->gherkin_document) {
        GherkinDocument_delete(gherkin_document_event->gherkin_document);
    }
    free((void*)gherkin_document_event);
}

static void GherkinDocumentEvent_print(const Event* event, FILE* file) {
    if (!event || event->event_type != Gherkin_GherkinDocumentEvent) {
        return;
    }
    const GherkinDocumentEvent* gherkin_document_event = (const GherkinDocumentEvent*)event;
    fprintf(file, "{");
    fprintf(file, "\"gherkinDocument\":");
    AstPrinter_print_gherkin_document(file, gherkin_document_event->gherkin_document);
    fprintf(file, "}\n");
}


