#include "pickle_string.h"
#include "string_utilities.h"
#include <stdlib.h>

const PickleString* PickleString_new(const wchar_t* content, const wchar_t* media_type) {
    PickleString* pickle_string = (PickleString*)malloc(sizeof(PickleString));
    pickle_string->type = Argument_String;
    pickle_string->content = 0;
    if (content) {
        pickle_string->content = StringUtilities_copy_string(content);
    }
    pickle_string->media_type = 0;
    if (media_type && wcslen(media_type) > 0) {
        pickle_string->media_type = StringUtilities_copy_string(media_type);
    }
    return pickle_string;
}

void PickleString_delete(const PickleString* pickle_string) {
    if (!pickle_string) {
        return;
    }
    if (pickle_string->content) {
        free((void*)pickle_string->content);
    }
    if (pickle_string->media_type) {
        free((void*)pickle_string->media_type);
    }
    free((void*)pickle_string);
}
