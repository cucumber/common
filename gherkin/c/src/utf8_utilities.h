#ifndef GHERKIN_UFT8_UTILITIES_H_
#define GHERKIN_UFT8_UTILITIES_H_

#include <wchar.h>

#include "utf8_source.h"

#ifdef __cplusplus
extern "C" {
#endif

wchar_t Utf8Utilities_read_wchar_from_utf8_source(Utf8Source* utf8_source);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_UFT8_UTILITIES_H_ */
