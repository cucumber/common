#include "event.h"

void Event_delete(const Event* event) {
    event->event_delete(event);
}

void Event_print(const Event* event, FILE* file) {
    event->event_print(event, file);
}
