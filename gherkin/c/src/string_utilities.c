#include "string_utilities.h"
#include <stdlib.h>

wchar_t* StringUtilities_copy_string(const wchar_t* string) {
    return StringUtilities_copy_string_part(string, wcslen(string));
}

wchar_t* StringUtilities_copy_string_part(const wchar_t* string, const int length) {
    wchar_t* copy = (wchar_t*)malloc((length + 1) * sizeof(wchar_t));
    wmemcpy(copy, string, length);
    copy[length] = L'\0';
    return copy;
}
