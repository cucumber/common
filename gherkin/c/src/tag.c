#include "tag.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_tag_content(const Tag* tag);

const Tag* Tag_new(Location location, const wchar_t* name) {
    Tag* tag = (Tag*)malloc(sizeof(Tag));
    tag->tag_delete = (item_delete_function)Tag_delete;
    tag->type = Gherkin_Tag;
    tag->location.line = location.line;
    tag->location.column = location.column;
    if (name) {
        tag->name = StringUtilities_copy_string(name);
    }
    return tag;
}

void Tag_delete(const Tag* tag) {
    if (!tag) {
        return;
    }
    delete_tag_content(tag);
    free((void*)tag);
}

void Tag_transfer(Tag* to_tag, Location location, wchar_t** name_ptr) {
    to_tag->type = Gherkin_Tag;
    to_tag->location.line = location.line;
    to_tag->location.column = location.column;
    to_tag->name = *name_ptr;
    *name_ptr = 0;
}

void Tags_delete(const Tags* tags) {
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

static void delete_tag_content(const Tag* tag) {
    if (tag->name) {
        free((void*)tag->name);
    }
}
