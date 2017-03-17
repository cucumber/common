#include "print_utilities.h"

void PrintUtilities_print_json_string(FILE* file, const wchar_t* text) {
    int i;
    for (i = 0; i < wcslen(text); ++i) {
        if (text[i] == L'\\' || text[i] == L'"') {
            fprintf(file, "%lc", (wint_t)L'\\');
            fprintf(file, "%lc", (wint_t)text[i]);
        }
        else if (text[i] == L'\n') {
            fprintf(file, "%lc", (wint_t)L'\\');
            fprintf(file, "%lc", (wint_t)L'n');
        }
        else if (text[i] == L'\r') {
            fprintf(file, "%lc", (wint_t)L'\\');
            fprintf(file, "%lc", (wint_t)L'r');
        }
        else {
            fprintf(file, "%lc", (wint_t)text[i]);
        }
    }
}
