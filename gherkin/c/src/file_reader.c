#include "file_reader.h"
#include "file_utf8_source.h"
#include "utf8_utilities.h"
#include <stdlib.h>

typedef struct FileReader {
    const char* file_name;
} FileReader;

FileReader* FileReader_new(const char* const file_name) {
    FileReader* file_reader = (FileReader*)malloc(sizeof(FileReader));
    file_reader->file_name = file_name;
    return (FileReader*) file_reader;
}

const wchar_t* FileReader_read(FileReader* file_reader) {
    int buffer_size = 256;
    wchar_t* buffer = (wchar_t*)malloc(buffer_size * sizeof(wchar_t));
    int pos = 0;
    wchar_t c;
    FILE* file = fopen(file_reader->file_name, "r");
    Utf8Source* utf8_source = FileUtf8Source_new(file);
    do {
        c = Utf8Utilities_read_wchar_from_utf8_source(utf8_source);
        if (c != WEOF) {
            buffer[pos++] = c;
            if (pos >= buffer_size - 1) {
                buffer_size *= 2;
                buffer = (wchar_t*)realloc(buffer, buffer_size * sizeof(wchar_t));
            }
        }
    } while (c != WEOF);
    buffer[pos] = L'\0';
    Utf8Source_delete(utf8_source);
    fclose(file);
    return buffer;
}

void FileReader_delete(FileReader* file_reader) {
    if (!file_reader) {
        return;
    }
    free((void*)file_reader);
}
