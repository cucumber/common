#include "string_utilities.h"
#include "utf8_utilities.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct StringUtf8Source {
    Utf8Source utf8_source;
    int position;
    int length;
    const char* string;
} StringUtf8Source;

static Utf8Source* StringUtf8Source_new(const char* string);

static void StringUtf8Source_delete(Utf8Source* utf8_source);

static unsigned char StringUtf8Source_read(Utf8Source* utf8_source);

wchar_t* StringUtilities_copy_string(const wchar_t* string) {
    return StringUtilities_copy_string_part(string, wcslen(string));
}

wchar_t* StringUtilities_copy_string_part(const wchar_t* string, const int length) {
    wchar_t* copy = (wchar_t*)malloc((length + 1) * sizeof(wchar_t));
    wmemcpy(copy, string, length);
    copy[length] = L'\0';
    return copy;
}

wchar_t* StringUtilities_copy_to_wide_string(const char* string) {
    int length = strlen(string);
    wchar_t* copy = (wchar_t*)malloc((length + 1) * sizeof(wchar_t));
    Utf8Source* utf8_source = StringUtf8Source_new(string);
    int i;
    for (i = 0; i < length; ++i) {
        wchar_t c = Utf8Utilities_read_wchar_from_utf8_source(utf8_source);
        if (c == WEOF) {
            break;
        }
        copy[i] = c;
    }
    copy[i] = L'\0';
    Utf8Source_delete(utf8_source);
    return copy;
}

Utf8Source* StringUtf8Source_new(const char* string) {
    StringUtf8Source* string_utf8_source = (StringUtf8Source*)malloc(sizeof(StringUtf8Source));
    string_utf8_source->utf8_source.read = &StringUtf8Source_read;
    string_utf8_source->utf8_source.delete = &StringUtf8Source_delete;
    string_utf8_source->position = 0;
    string_utf8_source->length = strlen(string);
    string_utf8_source->string = string;
    return (Utf8Source*)string_utf8_source;
}

void StringUtf8Source_delete(Utf8Source* utf8_source) {
    if (!utf8_source) {
        return;
    }
    free((void*)utf8_source);
}

unsigned char StringUtf8Source_read(Utf8Source* utf8_source) {
    StringUtf8Source* string_utf8_source = (StringUtf8Source*)utf8_source;
    if (string_utf8_source->position < string_utf8_source->length) {
        return string_utf8_source->string[string_utf8_source->position++];
    }
    return EOF;
}
