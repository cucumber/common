#ifndef GHERKIN_PICKLE_EVENT_H_
#define GHERKIN_PICKLE_EVENT_H_

#include <wchar.h>

#include "event.h"
#include "pickle.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct PickleEvent {
    Event event;
    wchar_t* uri;
    const Pickle* pickle;
} PickleEvent;

const PickleEvent* PickleEvent_new(const Pickle* pickle);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_EVENT_H_ */
