#include "gherkin_document_event.h"
#include "ast_printer.h"
#include <string.h>
#include <stdlib.h>

static void GherkinDocumentEvent_delete(const Event* event);

static void GherkinDocumentEvent_print(const Event* event, FILE* file);

const GherkinDocumentEvent* GherkinDocumentEvent_new(const char* uri, const GherkinDocument* gherkin_document) {
    GherkinDocumentEvent* gherkin_document_event = (GherkinDocumentEvent*)malloc(sizeof(GherkinDocumentEvent));
    gherkin_document_event->event.event_delete = &GherkinDocumentEvent_delete;
    gherkin_document_event->event.event_print = &GherkinDocumentEvent_print;
    gherkin_document_event->event.event_type = Gherkin_GherkinDocumentEvent;
    gherkin_document_event->uri = 0;
    if (uri) {
        int uri_length = strlen(uri);
        gherkin_document_event->uri = (wchar_t*)malloc((uri_length + 1) * sizeof(wchar_t));
        swprintf(gherkin_document_event->uri, uri_length + 1, L"%hs", uri);
        gherkin_document_event->uri[uri_length] = L'\0';
    }
    gherkin_document_event->gherkin_document = gherkin_document;
    return gherkin_document_event;
}

static void GherkinDocumentEvent_delete(const Event* event) {
    if (!event || event->event_type != Gherkin_GherkinDocumentEvent) {
        return;
    }
    const GherkinDocumentEvent* gherkin_document_event = (const GherkinDocumentEvent*)event;
    if (gherkin_document_event->uri) {
        free((void*)gherkin_document_event->uri);
    }
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
    fprintf(file, "\"type\":\"gherkin-document\",");
    fprintf(file, "\"uri\":\"%ls\",", gherkin_document_event->uri);
    fprintf(file, "\"document\":");
    AstPrinter_print_gherkin_document(file, gherkin_document_event->gherkin_document);
    fprintf(file, "}\n");
}


