#ifndef GHERKIN_PICKLE_PRINTER_H_
#define GHERKIN_PICKLE_PRINTER_H_

#include "pickle.h"

#include <stdio.h>
#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

void PicklePrinter_print_pickle(FILE* file, const Pickle* pickle, const wchar_t* uri);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_PRINTER_H_ */
