#include "pickle_event.h"
#include "pickle_printer.h"
#include <string.h>
#include <stdlib.h>

static void PickleEvent_delete(const Event* event);

static void PickleEvent_print(const Event* event, FILE* file);

const PickleEvent* PickleEvent_new(const char* uri, const Pickle* pickle) {
    PickleEvent* pickle_event = (PickleEvent*)malloc(sizeof(PickleEvent));
    pickle_event->event.event_delete = &PickleEvent_delete;
    pickle_event->event.event_print = &PickleEvent_print;
    pickle_event->event.event_type = Gherkin_PickleEvent;
    pickle_event->uri = 0;
    if (uri) {
        int uri_length = strlen(uri);
        pickle_event->uri = (wchar_t*)malloc((uri_length + 1) * sizeof(wchar_t));
        swprintf(pickle_event->uri, uri_length + 1, L"%hs", uri);
        pickle_event->uri[uri_length] = L'\0';
    }
    pickle_event->pickle = pickle;
    return pickle_event;
}

static void PickleEvent_delete(const Event* event) {
    if (!event || event->event_type != Gherkin_PickleEvent) {
        return;
    }
    const PickleEvent* pickle_event = (const PickleEvent*) event;
    if (pickle_event->uri) {
        free((void*)pickle_event->uri);
    }
    if (pickle_event->pickle) {
        Pickle_delete(pickle_event->pickle);
    }
    free((void*)pickle_event);
}

static void PickleEvent_print(const Event* event, FILE* file) {
    if (!event || event->event_type != Gherkin_PickleEvent) {
        return;
    }
    const PickleEvent* pickle_event = (const PickleEvent*) event;
    if (pickle_event) {
        fprintf(file, "{");
        fprintf(file, "\"type\":\"pickle\",");
        fprintf(file, "\"uri\":\"%ls\",", pickle_event->uri);
        fprintf(file, "\"pickle\":");
        PicklePrinter_print_pickle(file, pickle_event->pickle);
        fprintf(file, "}\n");
    }
}
