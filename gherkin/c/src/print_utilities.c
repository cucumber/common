#include "print_utilities.h"
#include "unicode_utilities.h"

void PrintUtilities_print_json_string(FILE* file, const wchar_t* text) {
    int i;
    for (i = 0; i < wcslen(text); ++i) {
        if (text[i] == L'\\' || text[i] == L'"') {
            fputc((char)'\\', file);
            fputc((char)text[i], file);
        }
        else if (text[i] == L'\n') {
            fputc((char)'\\', file);
            fputc((char)'n', file);
        }
        else if (text[i] == L'\r') {
            fputc((char)'\\', file);
            fputc((char)'r', file);
        }
        else {
            i = UnicodeUtilities_print_wide_character_to_utf8_file(file, text, i);
        }
    }
}

void PrintUtilities_print_wide_string(FILE* file, const wchar_t* text) {
    int i;
    for (i = 0; i < wcslen(text); ++i) {
        i = UnicodeUtilities_print_wide_character_to_utf8_file(file, text, i);
    }
}
