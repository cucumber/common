#include "source_event.h"
#include "print_utilities.h"
#include <string.h>
#include <stdlib.h>

static void SourceEvent_delete(const Event* event);

static void SourceEvent_print(const Event* event, FILE* file);

SourceEvent* SourceEvent_new(const char* uri, const wchar_t* source) {
    SourceEvent* source_event = (SourceEvent*)malloc(sizeof(SourceEvent));
    source_event->event.event_delete = &SourceEvent_delete;
    source_event->event.event_print = &SourceEvent_print;
    source_event->event.event_type = Gherkin_SourceEvent;
    source_event->uri = 0;
    if (uri) {
        int uri_length = strlen(uri);
        source_event->uri = (wchar_t*)malloc((uri_length + 1) * sizeof(wchar_t));
        swprintf(source_event->uri, uri_length + 1, L"%hs", uri);
        source_event->uri[uri_length] = L'\0';
    }
    source_event->source = source;
    return source_event;
}

static void SourceEvent_delete(const Event* event) {
    if (!event || event->event_type != Gherkin_SourceEvent) {
        return;
    }
    const SourceEvent* source_event = (const SourceEvent*)event;
    if (source_event->uri) {
        free((void*)source_event->uri);
    }
    if (source_event->source) {
        free((void*)source_event->source);
    }
    free((void*)source_event);
}

static void SourceEvent_print(const Event* event, FILE* file) {
    if (!event || event->event_type != Gherkin_SourceEvent) {
        return;
    }
    const SourceEvent* source_event = (const SourceEvent*)event;
    fprintf(file, "{");
    fprintf(file, "\"type\":\"source\",");
    fprintf(file, "\"media\":{\"encoding\":\"utf-8\",\"type\":\"text/vnd.cucumber.gherkin+plain\"},");
    fprintf(file, "\"uri\":\"%ls\",", source_event->uri);
    fprintf(file, "\"data\":\"");
    PrintUtilities_print_json_string(file, source_event->source);
    fprintf(file, "\"}\n");
}

