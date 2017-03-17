#ifndef GHERKIN_PICKLE_TAG_H_
#define GHERKIN_PICKLE_TAG_H_

#include <wchar.h>

#include "pickle_location.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct PickleTag {
    PickleLocation location;
    wchar_t* name;
} PickleTag;

typedef struct PickleTags {
    int tag_count;
    PickleTag* tags;
} PickleTags;

void PickleTag_delete(const PickleTag* tag);

void PickleTag_transfer(PickleTag* to_tag, const wchar_t* name, int line, int column);

void PickleTags_delete(const PickleTags* tags);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_TAG_H_ */
