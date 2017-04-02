#include "utf8_utilities.h"

wchar_t Utf8Utilities_read_wchar_from_utf8_source(Utf8Source* utf8_source) {
    unsigned char c = Utf8Source_read(utf8_source);
    if (c < 0x80) {
        return (wchar_t)c;
    }
    unsigned char c2 = Utf8Source_read(utf8_source);
    wchar_t lower_part = (wchar_t)(c2 & 0x3F);
    if ((c & 0xE0) == 0xC0) {
        return (((wchar_t)(c & 0x1F)) << 6) | lower_part;
    }
    c2 = Utf8Source_read(utf8_source);
    lower_part =  (lower_part << 6) | (wchar_t)(c2 & 0x3F);
    if ((c & 0xF0) == 0xE0) {
        return (((wchar_t)(c & 0x0F)) << 12) | lower_part;
    }
    c2 = Utf8Source_read(utf8_source);
    lower_part =  (lower_part << 6) | (wchar_t)(c2 & 0x3F);
    if ((c & 0xF8) == 0xF0) {
        return (((wchar_t)(c & 0x07)) << 18) | lower_part;
    }
    c2 = Utf8Source_read(utf8_source);
    lower_part =  (lower_part << 6) | (wchar_t)(c2 & 0x3F);
    if ((c & 0xFC) == 0xF8) {
        return (((wchar_t)(c & 0x03)) << 24) | lower_part;
    }
    c2 = Utf8Source_read(utf8_source);
    lower_part =  (lower_part << 6) | (wchar_t)(c2 & 0x3F);
    if ((c & 0xFE) == 0xFC) {
        return (((wchar_t)(c & 0x01)) << 30) | lower_part;
    }
    return WEOF;
}
