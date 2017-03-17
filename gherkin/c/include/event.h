#ifndef GHERKIN_EVENT_H_
#define GHERKIN_EVENT_H_

#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Event Event;

typedef void (*event_delete_function) (const Event*);

typedef void (*event_print_function) (const Event*, FILE* file);

typedef enum EventType {
    Gherkin_SourceEvent,
    Gherkin_AttachmentEvent,
    Gherkin_GherkinDocumentEvent,
    Gherkin_PickleEvent
} EventType;

typedef struct Event {
    event_delete_function event_delete;
    event_print_function event_print;
    EventType event_type;
} Event;

void Event_delete(const Event* event);

void Event_print(const Event* event, FILE* file);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_EVENT_H_ */
