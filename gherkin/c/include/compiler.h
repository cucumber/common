#ifndef GHERKIN_COMPILER_H_
#define GHERKIN_COMPILER_H_

#include <stdbool.h>
#include <wchar.h>
#include "gherkin_document.h"
#include "pickle.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Compiler Compiler;

Compiler* Compiler_new();

void Compiler_delete(Compiler* compiler);

int Compiler_compile(Compiler* compiler, const GherkinDocument* gherkin_document, const wchar_t* source);

bool Compiler_has_more_pickles(Compiler* compiler);

const Pickle* Compiler_next_pickle(Compiler* compiler);

bool Compiler_has_more_errors(Compiler* compiler);

const wchar_t* Compiler_next_error(Compiler* compiler);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_COMPILER_H_ */
