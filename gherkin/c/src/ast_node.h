#ifndef GHERKIN_AST_NODE_H_
#define GHERKIN_AST_NODE_H_

#include "rule_type.h"
#include "token.h"
#include "item.h"
#include "item_queue.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct AstNode {
    item_delete_function node_delete;
    RuleType rule_type;
    ItemQueue* item_queues;
} AstNode;

AstNode* AstNode_new(RuleType rule_type);

void AstNode_delete(AstNode* ast_node);

void AstNode_add(AstNode* ast_node, RuleType rule_type, void* object);

void* AstNode_get_single(AstNode* ast_node, RuleType rule_type);

ItemQueue* AstNode_get_items(AstNode* ast_node, RuleType rule_type);

Token* AstNode_get_token(AstNode* ast_node, TokenType token_type);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_AST_NODE_H_ */
