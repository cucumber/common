#ifndef GHERKIN_ERROR_EVENT_H_
#define GHERKIN_ERROR_EVENT_H_

#include <wchar.h>

#include "event.h"
#include "error.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct ErrorEvent {
    Event event;
    wchar_t* uri;
    Location location;
    const wchar_t* data;
} ErrorEvent;

ErrorEvent* ErrorEvent_new(const char* uri, const Location location);

void ErrorEvent_transfer_error_text(ErrorEvent* Error_event, Error* error);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_ERROR_EVENT_H_ */
