#ifndef GHERKIN_PICKLE_TAG_H_
#define GHERKIN_PICKLE_TAG_H_

#include <wchar.h>

#include "pickle_ast_node_id.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct PickleTag {
    PickleAstNodeId ast_node_id;
    wchar_t* name;
} PickleTag;

typedef struct PickleTags {
    int tag_count;
    PickleTag* tags;
} PickleTags;

void PickleTag_delete(const PickleTag* tag);

void PickleTag_transfer(PickleTag* to_tag, const wchar_t* ast_node_id, const wchar_t* name);

void PickleTags_delete(const PickleTags* tags);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_TAG_H_ */
