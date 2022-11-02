#include "pickle_tag.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_tag_content(const PickleTag* tag);

const PickleTag* PickleTag_new(const wchar_t* ast_node_id, const wchar_t* name) {
    PickleTag* tag = (PickleTag*)malloc(sizeof(PickleTag));
    tag->ast_node_id.id = 0;
    if (ast_node_id) {
        tag->ast_node_id.id = StringUtilities_copy_string(ast_node_id);
    }
    tag->name = 0;
    if (name) {
        tag->name = StringUtilities_copy_string(name);
    }
    return tag;
}

void PickleTag_delete(const PickleTag* tag) {
    if (!tag) {
        return;
    }
    delete_tag_content(tag);
    free((void*)tag);
}

void PickleTag_transfer(PickleTag* to_tag, const wchar_t* ast_node_id, const wchar_t* name) {
    to_tag->ast_node_id.id = 0;
    if (ast_node_id) {
        to_tag->ast_node_id.id = StringUtilities_copy_string(ast_node_id);
    }
    to_tag->name = 0;
    if (name) {
        to_tag->name = StringUtilities_copy_string(name);
    }
}

void PickleTags_delete(const PickleTags* tags) {
    if (!tags) {
        return;
    }
    if (tags->tags) {
        int i;
        for(i = 0; i < tags->tag_count; ++i) {
            delete_tag_content(tags->tags + i);
        }
        free((void*)tags->tags);
    }
    free((void*)tags);
}

static void delete_tag_content(const PickleTag* tag) {
    if (tag->ast_node_id.id) {
        free((void*)tag->ast_node_id.id);
    }
    if (tag->name) {
        free((void*)tag->name);
    }
}
