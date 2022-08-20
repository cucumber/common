#include "pickle_ast_node_id.h"
#include "string_utilities.h"
#include <stdlib.h>

const PickleAstNodeId* PickleAstNodeId_new(const wchar_t* id) {
    PickleAstNodeId* ast_node_id = (PickleAstNodeId*)malloc(sizeof(PickleAstNodeId));
    ast_node_id->id = 0;
    if (id) {
        ast_node_id->id = StringUtilities_copy_string(id);
    }
    return ast_node_id;
}

const PickleAstNodeIds* PickleAstNodeIds_new_single(const wchar_t* id) {
    const PickleAstNodeId* ast_node_id = PickleAstNodeId_new(id);
    PickleAstNodeIds* ast_node_ids = (PickleAstNodeIds*)malloc(sizeof(PickleAstNodeIds));
    ast_node_ids->ast_node_id_count = 1;
    ast_node_ids->ast_node_ids = ast_node_id;
    return ast_node_ids;
}

const PickleAstNodeIds* PickleAstNodeIds_new_double(const wchar_t* id_1, const wchar_t* id_2) {
    PickleAstNodeId* ast_node_id_array = (PickleAstNodeId*)malloc(2 * sizeof(PickleAstNodeId));
    ast_node_id_array[0].id = 0;
    ast_node_id_array[1].id = 0;
    if (id_1) {
        ast_node_id_array[0].id = StringUtilities_copy_string(id_1);
    }
    if (id_2) {
        ast_node_id_array[1].id = StringUtilities_copy_string(id_2);
    }
    PickleAstNodeIds* ast_node_ids = (PickleAstNodeIds*)malloc(sizeof(PickleAstNodeIds));
    ast_node_ids->ast_node_id_count = 2;
    ast_node_ids->ast_node_ids = ast_node_id_array;
    return ast_node_ids;
}

void PickleAstNodeId_delete(const PickleAstNodeId* ast_node_id) {
    if (!ast_node_id) {
        return;
    }
    if (ast_node_id->id) {
        free((void*) ast_node_id->id);
    }
    free((void*) ast_node_id);
}

void PickleAstNodeIds_delete(const PickleAstNodeIds* ast_node_ids) {
    if (!ast_node_ids) {
        return;
    }
    if (ast_node_ids->ast_node_ids) {
        free((void*) ast_node_ids->ast_node_ids);
    }
    free((void*) ast_node_ids);
}
