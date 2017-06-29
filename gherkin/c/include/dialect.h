#ifndef GHERKIN_DIALECT_H_
#define GHERKIN_DIALECT_H_

#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Keywords {
    int count;
    const wchar_t* const *keywords;
} Keywords;

typedef struct Dialect {
    const wchar_t* language_name;
    const Keywords* and_keywords;
    const Keywords* background_keywords;
    const Keywords* but_keywords;
    const Keywords* examples_keywords;
    const Keywords* feature_keywords;
    const Keywords* given_keywords;
    const Keywords* scenario_keywords;
    const Keywords* scenario_outline_keywords;
    const Keywords* then_keywords;
    const Keywords* when_keywords;
} Dialect;

const Dialect* Dialect_for(const wchar_t* language);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_DIALECT_H_ */
