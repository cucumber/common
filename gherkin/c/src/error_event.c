#include "print_utilities.h"
#include "string_utilities.h"
#include <string.h>
#include <stdlib.h>
#include "error_event.h"

static void ErrorEvent_delete(const Event* event);

static void ErrorEvent_print(const Event* event, FILE* file);

ErrorEvent* ErrorEvent_new(const char* uri, const Location location) {
    ErrorEvent* error_event = (ErrorEvent*)malloc(sizeof(ErrorEvent));
    error_event->event.event_delete = &ErrorEvent_delete;
    error_event->event.event_print = &ErrorEvent_print;
    error_event->event.event_type = Gherkin_ErrorEvent;
    error_event->uri = 0;
    if (uri) {
        error_event->uri = StringUtilities_copy_to_wide_string(uri);
    }
    error_event->location.line = location.line;
    error_event->location.column = location.column;
    return error_event;
}

void ErrorEvent_transfer_error_text(ErrorEvent* error_event, Error* error) {
    error_event->data = error->error_text;
    error->error_text = 0;
}

static void ErrorEvent_delete(const Event* event) {
    if (!event || event->event_type != Gherkin_ErrorEvent) {
        return;
    }
    const ErrorEvent* error_event = (const ErrorEvent*)event;
    if (error_event->uri) {
        free((void*)error_event->uri);
    }
    if (error_event->data) {
        free((void*)error_event->data);
    }
    free((void*)error_event);
}

static void ErrorEvent_print(const Event* event, FILE* file) {
    if (!event || event->event_type != Gherkin_ErrorEvent) {
        return;
    }
    const ErrorEvent* error_event = (const ErrorEvent*)event;
    fprintf(file, "{\"parseError\":{");
    fprintf(file, "\"message\":\"");
    PrintUtilities_print_json_string(file, error_event->data);
    fprintf(file, "\",\"source\":{\"location\":");
    fprintf(file, "{\"line\":%d", error_event->location.line);
    if (error_event->location.column > 0) {
        fprintf(file, ",\"column\":%d", error_event->location.column);
    }
    fprintf(file, "},\"uri\":\"");
    PrintUtilities_print_json_string(file, error_event->uri);
    fprintf(file, "\"}}}\n");
}
