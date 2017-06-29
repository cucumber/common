#ifndef GHERKIN_STRING_TOKEN_SCANNER_H_
#define GHERKIN_STRING_TOKEN_SCANNER_H_

#include <wchar.h>

#include "token_scanner.h"

#ifdef __cplusplus
extern "C" {
#endif

TokenScanner* StringTokenScanner_new(const wchar_t* const source);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_STRING_TOKEN_SCANNER_H_ */
