#ifndef GHERKIN_GHERKIN_DOCUMENT_EVENT_H_
#define GHERKIN_GHERKIN_DOCUMENT_EVENT_H_

#include <wchar.h>

#include "event.h"
#include "gherkin_document.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct GherkinDocumentEvent {
    Event event;
    wchar_t* uri;
    const GherkinDocument* gherkin_document;
} GherkinDocumentEvent;

const GherkinDocumentEvent* GherkinDocumentEvent_new(const char* uri, const GherkinDocument* gherkin_document);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_GHERKIN_DOCUMENT_EVENT_H_ */
