#ifndef GHERKIN_STRING_UTILITIES_H_
#define GHERKIN_STRING_UTILITIES_H_

#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

wchar_t* StringUtilities_copy_string(const wchar_t* string);

wchar_t* StringUtilities_copy_string_part(const wchar_t* string, const int length);

wchar_t* StringUtilities_copy_to_wide_string(const char* string);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_STRING_UTILITIES_H_ */
