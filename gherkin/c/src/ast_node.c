#include "ast_node.h"
#include <stdlib.h>

static void delete(Item* item);

AstNode* AstNode_new(RuleType rule_type) {
    AstNode* ast_node = (AstNode*)malloc(sizeof(AstNode));
    ast_node->node_delete = &delete;
    ast_node->rule_type = rule_type;
    ast_node->item_queues = ItemQueue_new_array(Rule_Count);
    return ast_node;
}

void delete(Item* item) {
    if (!item) {
        return;
    }
    AstNode_delete((AstNode*)item);
}

void AstNode_delete(AstNode* ast_node) {
    if (!ast_node) {
        return;
    }
    ItemQueue_delete_array(ast_node->item_queues, Rule_Count);
    free((void*)ast_node);
}

void AstNode_add(AstNode* ast_node, RuleType rule_type, void* object) {
    ItemQueue_add(&ast_node->item_queues[rule_type], object);
}

void* AstNode_get_single(AstNode* ast_node, RuleType rule_type) {
    return ItemQueue_remove(&ast_node->item_queues[rule_type]);
}

Token* AstNode_get_token(AstNode* ast_node, TokenType token_type) {
    return (Token*)AstNode_get_single(ast_node, (RuleType)token_type);
}

ItemQueue* AstNode_get_items(AstNode* ast_node, RuleType rule_type) {
    return &ast_node->item_queues[rule_type];
}
