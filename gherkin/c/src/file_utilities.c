#include "file_utilities.h"

wchar_t FileUtilities_read_wchar_from_file(FILE* file) {
    unsigned char c = fgetc(file);
    if (c < 0x80) {
        return (wchar_t)c;
    }
    unsigned char c2 = fgetc(file);
    wchar_t lower_part = (wchar_t)(c2 & 0x3F);
    if ((c & 0xE0) == 0xC0) {
        return (((wchar_t)(c & 0x1F)) << 6) | lower_part;
    }
    c2 = fgetc(file);
    lower_part =  (lower_part << 6) | (wchar_t)(c2 & 0x3F);
    if ((c & 0xF0) == 0xE0) {
        return (((wchar_t)(c & 0x0F)) << 12) | lower_part;
    }
    c2 = fgetc(file);
    lower_part =  (lower_part << 6) | (wchar_t)(c2 & 0x3F);
    if ((c & 0xF8) == 0xF0) {
        return (((wchar_t)(c & 0x07)) << 18) | lower_part;
    }
    c2 = fgetc(file);
    lower_part =  (lower_part << 6) | (wchar_t)(c2 & 0x3F);
    if ((c & 0xFC) == 0xF8) {
        return (((wchar_t)(c & 0x03)) << 24) | lower_part;
    }
    c2 = fgetc(file);
    lower_part =  (lower_part << 6) | (wchar_t)(c2 & 0x3F);
    if ((c & 0xFE) == 0xFC) {
        return (((wchar_t)(c & 0x01)) << 30) | lower_part;
    }
    return WEOF;
}
