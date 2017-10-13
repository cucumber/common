#include "attachment_event.h"
#include "print_utilities.h"
#include "string_utilities.h"
#include <string.h>
#include <stdlib.h>

static void AttachmentEvent_delete(const Event* event);

static void AttachmentEvent_print(const Event* event, FILE* file);

AttachmentEvent* AttachmentEvent_new(const char* uri, const Location location) {
    AttachmentEvent* attachment_event = (AttachmentEvent*)malloc(sizeof(AttachmentEvent));
    attachment_event->event.event_delete = &AttachmentEvent_delete;
    attachment_event->event.event_print = &AttachmentEvent_print;
    attachment_event->event.event_type = Gherkin_AttachmentEvent;
    attachment_event->uri = 0;
    if (uri) {
        attachment_event->uri = StringUtilities_copy_to_wide_string(uri);
    }
    attachment_event->location.line = location.line;
    attachment_event->location.column = location.column;
    return attachment_event;
}

void AttacnmentEvent_transfer_error_text(AttachmentEvent* attachment_event, Error* error) {
    attachment_event->data = error->error_text;
    error->error_text = 0;
}

static void AttachmentEvent_delete(const Event* event) {
    if (!event || event->event_type != Gherkin_AttachmentEvent) {
        return;
    }
    const AttachmentEvent* error_event = (const AttachmentEvent*)event;
    if (error_event->uri) {
        free((void*)error_event->uri);
    }
    if (error_event->data) {
        free((void*)error_event->data);
    }
    free((void*)error_event);
}

static void AttachmentEvent_print(const Event* event, FILE* file) {
    if (!event || event->event_type != Gherkin_AttachmentEvent) {
        return;
    }
    const AttachmentEvent* attachment_event = (const AttachmentEvent*)event;
    fprintf(file, "{");
    fprintf(file, "\"data\":\"");
    PrintUtilities_print_json_string(file, attachment_event->data);
    fprintf(file, "\",\"media\":{\"encoding\":\"utf-8\",\"type\":\"text/x.cucumber.stacktrace+plain\"},");
    fprintf(file, "\"source\":{\"start\":");
    fprintf(file, "{\"line\":%d,", attachment_event->location.line);
    fprintf(file, "\"column\":%d},", attachment_event->location.column);
    fprintf(file, "\"uri\":\"");
    PrintUtilities_print_json_string(file, attachment_event->uri);
    fprintf(file, "\"},\"type\":\"attachment\"");
    fprintf(file, "}\n");
}
