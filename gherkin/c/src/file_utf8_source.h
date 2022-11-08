#ifndef GHERKIN_FILE_UTF8_SOURCE_H_
#define GHERKIN_FILE_UTF8_SOURCE_H_

#include <stdio.h>

#include "utf8_source.h"

#ifdef __cplusplus
extern "C" {
#endif

Utf8Source* FileUtf8Source_new(FILE* file);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_FILE_UTF8_SOURCE_H_ */
