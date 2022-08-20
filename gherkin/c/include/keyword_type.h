#ifndef KEYWORD_TYPE_H_
#define KEYWORD_TYPE_H_

#ifdef __cplusplus
extern "C" {
#endif

typedef enum KeywordType {
    Keyword_Type_None,
    Keyword_Unknown,
    Keyword_Context,
    Keyword_Action,
    Keyword_Outcome,
    Keyword_Conjunction
} KeywordType;

#ifdef __cplusplus
}
#endif

#endif /* KEYWORD_TYPE_H_ */
