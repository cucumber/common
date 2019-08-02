#include "pickle.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_pickle_content(const Pickle* pickle);

const Pickle* Pickle_new(const wchar_t* uri, const wchar_t* language, const PickleLocations* locations, const PickleTags* tags, const wchar_t* name, const unsigned char* id, const PickleSteps* steps) {
    Pickle* pickle = (Pickle*)malloc(sizeof(Pickle));
    pickle->pickle_delete = (item_delete_function)Pickle_delete;
    pickle->uri = StringUtilities_copy_string(uri);
    pickle->language = StringUtilities_copy_string(language);
    pickle->locations = locations;
    pickle->tags = tags;
    pickle->name = 0;
    if (name) {
        pickle->name = StringUtilities_copy_string(name);
    }
    pickle->id = id;
    pickle->steps = steps;
    return pickle;
}

void Pickle_delete(const Pickle* pickle) {
    if (!pickle) {
        return;
    }
    delete_pickle_content(pickle);
    free((void*)pickle);
}

static void delete_pickle_content(const Pickle* pickle) {
    if (pickle->uri) {
        free((void*)pickle->uri);
    }
    if (pickle->language) {
        free((void*)pickle->language);
    }
    if (pickle->locations) {
        PickleLocations_delete(pickle->locations);
    }
    if (pickle->tags) {
        PickleTags_delete(pickle->tags);
    }
    if (pickle->name) {
        free((void*)pickle->name);
    }
    if (pickle->id) {
        free((void*)pickle->id);
    }
    if (pickle->steps) {
        PickleSteps_delete(pickle->steps);
    }
}
