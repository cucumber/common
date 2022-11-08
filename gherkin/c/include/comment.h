#ifndef GHERKIN_COMMENT_H_
#define GHERKIN_COMMENT_H_

#include <wchar.h>

#include "ast.h"
#include "location.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Comment {
    item_delete_function comment_delete;
    GherkinAstType type;
    Location location;
    wchar_t* text;
} Comment;

typedef struct Comments {
    int comment_count;
    Comment* comments;
} Comments;

Comment* Comment_new(Location location, const wchar_t* text);

void Comment_delete(const Comment* comment);

void Comment_transfer(Comment* to_comment, Comment* from_comment);

void Comments_delete(const Comments* comments);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_COMMENT_H_ */
