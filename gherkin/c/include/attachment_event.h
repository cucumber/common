#ifndef GHERKIN_ATTACHMENT_EVENT_H_
#define GHERKIN_ATTACHMENT_EVENT_H_

#include <wchar.h>

#include "event.h"
#include "error.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct AttachmentEvent {
    Event event;
    wchar_t* uri;
    Location location;
    const wchar_t* data;
} AttachmentEvent;

AttachmentEvent* AttachmentEvent_new(const char* uri, const Location location);

void AttacnmentEvent_transfer_error_text(AttachmentEvent* attachment_event, Error* error);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_ATTACHMENT_EVENT_H_ */
