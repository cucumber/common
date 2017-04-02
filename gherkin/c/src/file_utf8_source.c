#include "file_utf8_source.h"
#include <stdlib.h>

typedef struct FileUtf8Source {
    Utf8Source utf8_source;
    FILE* file;
} FileUtf8Source;

static void FileUtf8Source_delete(Utf8Source* utf8_source);

static unsigned char FileUtf8Source_read(Utf8Source* utf8_source);

Utf8Source* FileUtf8Source_new(FILE* file) {
    FileUtf8Source* file_utf8_source = (FileUtf8Source*)malloc(sizeof(FileUtf8Source));
    file_utf8_source->utf8_source.read = &FileUtf8Source_read;
    file_utf8_source->utf8_source.delete = &FileUtf8Source_delete;
    file_utf8_source->file = file;
    return (Utf8Source*)file_utf8_source;
}

void FileUtf8Source_delete(Utf8Source* utf8_source) {
    if (!utf8_source) {
        return;
    }
    free((void*)utf8_source);
}

unsigned char FileUtf8Source_read(Utf8Source* utf8_source) {
    return fgetc(((FileUtf8Source*)utf8_source)->file);
}
