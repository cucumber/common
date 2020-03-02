#ifndef GHERKIN_UTF8_SOURCE_H_
#define GHERKIN_UTF8_SOURCE_H_

#include <wchar.h>

#include "utf8_source.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Utf8Source Utf8Source;

typedef unsigned char (*utf8_source_read_function) (Utf8Source*);

typedef void (*utf8_source_delete_function) (Utf8Source*);

struct Utf8Source {
    utf8_source_read_function read;
    utf8_source_delete_function del;
};

unsigned char Utf8Source_read(Utf8Source* utf8_source);

void Utf8Source_delete(Utf8Source* utf8_source);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_UTF8_SOURCE_H_ */
