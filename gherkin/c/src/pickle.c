#include "pickle.h"
#include "string_utilities.h"
#include <stdlib.h>

static void delete_pickle_content(const Pickle* pickle);

const Pickle* Pickle_new(IdGenerator* id_generator, const wchar_t* uri, const wchar_t* language, const PickleAstNodeIds* ast_node_ids, const PickleTags* tags, const wchar_t* name, const PickleSteps* steps) {
    Pickle* pickle = (Pickle*)malloc(sizeof(Pickle));
    pickle->pickle_delete = (item_delete_function)Pickle_delete;
    pickle->uri = StringUtilities_copy_string(uri);
    pickle->language = StringUtilities_copy_string(language);
    pickle->ast_node_ids = ast_node_ids;
    pickle->tags = tags;
    pickle->name = 0;
    if (name) {
        pickle->name = StringUtilities_copy_string(name);
    }
    pickle->id = id_generator->new_id(id_generator);
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
    if (pickle->ast_node_ids) {
        PickleAstNodeIds_delete(pickle->ast_node_ids);
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
