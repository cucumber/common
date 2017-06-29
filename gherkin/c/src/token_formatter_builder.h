#ifndef GHERKIN_TOKEN_FORMATTER_BUILDER_H_
#define GHERKIN_TOKEN_FORMATTER_BUILDER_H_

#include "builder.h"

#ifdef __cplusplus
extern "C" {
#endif

Builder* TokenFormatterBuilder_new();

void TokenFormatterBuilder_delete(Builder* builder);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_TOKEN_FORMATTER_BUILDER_H_ */
