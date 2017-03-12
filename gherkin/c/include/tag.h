#ifndef GHERKIN_TAG_H_
#define GHERKIN_TAG_H_

#include <wchar.h>

#include "ast.h"
#include "location.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Tag {
    item_delete_function tag_delete;
    GherkinAstType type;
    Location location;
    wchar_t* name;
} Tag;

typedef struct Tags {
    int tag_count;
    Tag* tags;
} Tags;

const Tag* Tag_new(Location location, const wchar_t* name);

void Tag_delete(const Tag* tag);

void Tag_transfer(Tag* to_tag, Location location, wchar_t** name_ptr);

void Tags_delete(const Tags* tags);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_TAG_H_ */
