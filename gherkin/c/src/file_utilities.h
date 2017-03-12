#ifndef GHERKIN_FILE_UTILITIES_H_
#define GHERKIN_FILE_UTILITIES_H_

#include <stdio.h>
#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

wchar_t FileUtilities_read_wchar_from_file(FILE* file);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_FILE_UTILITIES_H_ */
