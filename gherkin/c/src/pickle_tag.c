#include "pickle_tag.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_tag_content(const PickleTag* tag);

const PickleTag* PickleTag_new(const wchar_t* name, int line, int column) {
    PickleTag* tag = (PickleTag*)malloc(sizeof(PickleTag));
    tag->location.line = line;
    tag->location.column = column;
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

void PickleTag_transfer(PickleTag* to_tag, const wchar_t* name, int line, int column) {
    to_tag->location.line = line;
    to_tag->location.column = column;
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
    if (tag->name) {
        free((void*)tag->name);
    }
}
