#include "string_utilities.h"
#include "unicode_utilities.h"
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
    int to_index = 0;
    int i;
    for (i = 0; i < length; ++i) {
        long code_point = UnicodeUtilities_read_code_point_from_utf8_source(utf8_source);
        if (code_point == WEOF) {
            break;
        }
        if (code_point <= 0xFFFF || sizeof(wchar_t) > 2) {
            copy[to_index++] = (wchar_t)code_point;
        } else {
            Utf16Surrogates surrogates = UnicodeUtilities_get_utf16_surrogates(code_point);
            copy[to_index++] = surrogates.leading;
            copy[to_index++] = surrogates.trailing;
        }
    }
    copy[to_index] = L'\0';
    Utf8Source_delete(utf8_source);
    return copy;
}

size_t StringUtilities_code_point_length(const wchar_t* string) {
    if (sizeof(wchar_t) > 2) {
        return wcslen(string);
    } else {
        return StringUtilities_code_point_length_for_part(string, wcslen(string));
    }
}

size_t StringUtilities_code_point_length_for_part(const wchar_t* string, const int length) {
    int code_points = 0;
    int i;
    for (i = 0; i < length; ++i) {
        ++code_points;
        if (UnicodeUtilities_is_utf16_surrogate(string[i])) {
            ++i;
        }

    }
    return code_points;
}

/* The unicode characters with property White_Space=yes according to Wikipedia */
/* L'\u0085' (Next Line) is excluded since the (gcc) compiler gives the error  */
/* "\u0085 is not a valid universal character"                                 */
bool StringUtilities_is_whitespace(const wchar_t wchar) {
    return (wchar == L' ' ||
            wchar == L'\t' ||
            wchar == L'\n' ||
            wchar == L'\r' ||
            wchar == L'\f' ||
            wchar == L'\v' ||
            wchar == L'\u00A0' ||
            wchar == L'\u1680' ||
            wchar == L'\u2000' ||
            wchar == L'\u2001' ||
            wchar == L'\u2002' ||
            wchar == L'\u2003' ||
            wchar == L'\u2004' ||
            wchar == L'\u2005' ||
            wchar == L'\u2006' ||
            wchar == L'\u2007' ||
            wchar == L'\u2008' ||
            wchar == L'\u2009' ||
            wchar == L'\u200A' ||
            wchar == L'\u2028' ||
            wchar == L'\u2029' ||
            wchar == L'\u202F' ||
            wchar == L'\u205F' ||
            wchar == L'\u3000');
}


Utf8Source* StringUtf8Source_new(const char* string) {
    StringUtf8Source* string_utf8_source = (StringUtf8Source*)malloc(sizeof(StringUtf8Source));
    string_utf8_source->utf8_source.read = &StringUtf8Source_read;
    string_utf8_source->utf8_source.del = &StringUtf8Source_delete;
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
