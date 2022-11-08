# Using the Gherkin library

The Gherkin library is using functions in the math library, so the math library needs also to be linked when the Gherkin library is used.

Example:
```c
#include <locale.h>
#include <stdlib.h>
#include <string.h>
#include <wchar.h>

#include "ast_builder.h"
#include "compiler.h"
#include "error.h"
#include "file_reader.h"
#include "gherkin_document.h"
#include "id_generator.h"
#include "incrementing_id_generator.h"
#include "parser.h"
#include "pickle.h"
#include "string_token_scanner.h"
#include "token_matcher.h"

setlocale(LC_ALL, "en_US.UTF-8");
TokenMatcher* token_matcher = TokenMatcher_new(L"en");
IdGenerator* id_generator = IncrementingIdGenerator_new();
Builder* builder = AstBuilder_new(id_generator);
Parser* parser = Parser_new(builder);
Compiler* compiler = Compiler_new(id_generator);
const char* filename = "minimal.feature";
FileReader* file_reader = FileReader_new(filename);
const wchar_t* content = FileReader_read(file_reader);
TokenScanner* token_scanner = StringTokenScanner_new(FileReader_read(file_reader));
int result_code = 0;
result_code = Parser_parse(parser, token_matcher, token_scanner);
if (result_code == 0) {
    const GherkinDocument* gherkin_document = AstBuilder_get_result(builder, filename);
    result_code = Compiler_compile(compiler, gherkin_document, content);
    if (result_code == 0) {
        while (Compiler_has_more_pickles(compiler)) {
            const Pickle* pickle = Compiler_next_pickle(compiler);
            // process pickle
            Pickle_delete(pickle);
        }
    }
    GherkinDocument_delete(gherkin_document);
}
else {
    while (Parser_has_more_errors(parser)) {
        Error* error = Parser_next_error(parser);
        // handle error
        Error_delete(error);
    }
}
TokenScanner_delete(token_scanner);
free((void*)content);
FileReader_delete(file_reader);
Compiler_delete(compiler);
Parser_delete(parser);
AstBuilder_delete(builder);
id_generator->id_generator_delete(id_generator);
TokenMatcher_delete(token_matcher);
```

The source file [`gherkin_cli.c`](src/gherkin_cli.c) can be used as an example of using the Gherkin library.

The Gherkin library contains only an incrementing id generator (generating the ids "1", "2", ...), should UUIDs be necessary, the user needs to provide an implementation of the id_generator.h interface that generates UUID strings.

# Building

Three artifacts can be built:

* the Gherkin library for static linking (libgherkin.a)
* the Gherkin library for dynamic linking (libgherkin.so.&lt;version>)
* the cli binary used for running the Gherkin acceptance tests (gherkin)

Both Makefiles and definition files for cmake are available in the repository.

## Build using make:

* The make target "libs" is used to build the Gherkin library for static linking
* The make target "libs_so" is used to build the Gherkin library for static linking
* The make target "cli" is used to biuld the cli binary (the Gherkin library for static linking will aslo be build, since it is used when linking the cli).

### Building the cli with gcc:

    make cli

### Building the with clang

    make CC=clang cli

### Building Windows cli with mingw

Install the toolchain (OS X)

    brew install mingw-w64
    # Run `brew info mingw-w64` to verify the path before next command
    export PATH=/usr/local/Cellar/mingw-w64/5.0.1/bin:$PATH
    # Install wine - for testing
    brew cask install xquartz
    brew install wine

Build:

    make CC=i686-w64-mingw32-gcc cli

### Build the cli with other compilers

Edit `src/Makefile` and set CC, CC_FLAGS, AR, AR_FLAGS, LD, LD_FLAGS appropriately, then run `make cli`

## Build using cmake

```
mkdir build
cd build
cmake ..
cmake --build . --target install
```

You can use this library in your project like this
```
cmake_minimum_required(VERSION 3.0)
project(gherkincsample)
list(APPEND CMAKE_PREFIX_PATH "INSTALLATION_DIRECTORY")
set(CMAKE_CXX_STANDARD 11)
find_package(gherkin REQUIRED)
add_executable(gherkincsample main.cpp)
target_link_libraries(gherkincsample gherkin::gherkin)
```

You can build this library as an external project in you project like this
```
cmake_minimum_required(VERSION 3.7)
project(gherkincsample)
include(ExternalProject)
ExternalProject_Add(gherkin_proj
  GIT_REPOSITORY https://github.com/cucumber/common.git
  GIT_TAG        <commit SHA or tag>
  SOURCE_SUBDIR  gherkin/c
)
...
```

# Docs

[The docs are here](https://cucumber.io/docs/).
