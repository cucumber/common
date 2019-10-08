#include "file_reader.h"
#include "file_utf8_source.h"
#include "unicode_utilities.h"
#include <stdlib.h>

struct FileReader {
    const char* file_name;
};

static void extend_buffer_if_needed(wchar_t** buffer, int* buffer_size, int pos);

FileReader* FileReader_new(const char* const file_name) {
    FileReader* file_reader = (FileReader*)malloc(sizeof(FileReader));
    file_reader->file_name = file_name;
    return (FileReader*) file_reader;
}

const wchar_t* FileReader_read(FileReader* file_reader) {
    int buffer_size = 256;
    wchar_t* buffer = (wchar_t*)malloc(buffer_size * sizeof(wchar_t));
    int pos = 0;
    long code_point;
    FILE* file = fopen(file_reader->file_name, "rb");

    if(file == NULL) {
        buffer[pos] = L'\0';
        return buffer;
    }

    Utf8Source* utf8_source = FileUtf8Source_new(file);

    do {
        code_point = UnicodeUtilities_read_code_point_from_utf8_source(utf8_source);
        if (code_point != WEOF) {
            if (code_point <= 0xFFFF || sizeof(wchar_t) > 2) {
                buffer[pos++] = (wchar_t)code_point;
                extend_buffer_if_needed(&buffer, &buffer_size, pos);
            } else {
                Utf16Surrogates surrogates = UnicodeUtilities_get_utf16_surrogates(code_point);
                buffer[pos++] = surrogates.leading;
                extend_buffer_if_needed(&buffer, &buffer_size, pos);
                buffer[pos++] = surrogates.trailing;
                extend_buffer_if_needed(&buffer, &buffer_size, pos);
            }
        }
    } while (code_point != WEOF);
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

static void extend_buffer_if_needed(wchar_t** buffer, int* buffer_size, int pos) {
    if (pos >= *buffer_size - 1) {
        *buffer_size *= 2;
        *buffer = (wchar_t*)realloc(*buffer, *buffer_size * sizeof(wchar_t));
    }
}
