#ifndef GHERKIN_PICKLE_AST_NODE_ID_H_
#define GHERKIN_PICKLE_AST_NODE_ID_H_

#include <wchar.h>


typedef struct PickleAstNodeId {
    const wchar_t* id;
} PickleAstNodeId;

typedef struct PickleAstNodeIds {
    int ast_node_id_count;
    const PickleAstNodeId* ast_node_ids;
} PickleAstNodeIds;

const PickleAstNodeId* PickleAstNodeId_new(const wchar_t* id);

const PickleAstNodeIds* PickleAstNodeIds_new_single(const wchar_t* id);

const PickleAstNodeIds* PickleAstNodeIds_new_double(const wchar_t* id_1, const wchar_t* id_2);

void PickleAstNodeIds_delete(const PickleAstNodeIds* ast_node_ids);

void PickleAstNodeId_delete(const PickleAstNodeId* ast_node_id);

#endif /* GHERKIN_PICKLE_AST_NODE_ID_H_ */
