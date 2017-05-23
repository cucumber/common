#include "unicode_utilities.h"

static void print_code_point_to_utf8_file(FILE* file, long code_point);

long UnicodeUtilities_read_code_point_from_utf8_source(Utf8Source* utf8_source) {
    unsigned char c = Utf8Source_read(utf8_source);
    if (c < 0x80) {
        return (long)c;
    }
    unsigned char c2 = Utf8Source_read(utf8_source);
    long lower_part = (long)(c2 & 0x3F);
    if ((c & 0xE0) == 0xC0) {
        return (((long)(c & 0x1F)) << 6) | lower_part;
    }
    c2 = Utf8Source_read(utf8_source);
    lower_part =  (lower_part << 6) | (long)(c2 & 0x3F);
    if ((c & 0xF0) == 0xE0) {
        return (((long)(c & 0x0F)) << 12) | lower_part;
    }
    c2 = Utf8Source_read(utf8_source);
    lower_part =  (lower_part << 6) | (long)(c2 & 0x3F);
    if ((c & 0xF8) == 0xF0) {
        return (((long)(c & 0x07)) << 18) | lower_part;
    }
    c2 = Utf8Source_read(utf8_source);
    lower_part =  (lower_part << 6) | (long)(c2 & 0x3F);
    if ((c & 0xFC) == 0xF8) {
        return (((long)(c & 0x03)) << 24) | lower_part;
    }
    c2 = Utf8Source_read(utf8_source);
    lower_part =  (lower_part << 6) | (long)(c2 & 0x3F);
    if ((c & 0xFE) == 0xFC) {
        return (((long)(c & 0x01)) << 30) | lower_part;
    }
    return WEOF;
}

Utf16Surrogates UnicodeUtilities_get_utf16_surrogates(long code_point){
    Utf16Surrogates surrogates;
    long surrogates_base = code_point - 0x10000;
    surrogates.leading = 0xD800 + (surrogates_base >> 10);
    surrogates.trailing = 0xDC00 + (surrogates_base & 0x3FF);
    return surrogates;
}

int UnicodeUtilities_print_wide_character_to_utf8_file(FILE* file, const wchar_t* text, int pos) {
    long code_point;
    if (!UnicodeUtilities_is_utf16_surrogate(text[pos]) || sizeof(wchar_t) > 2) {
        code_point = (long)text[pos];
    } else {
        long leading_surrogate = (long)text[pos++];
        long trailing_surrogate = (long)text[pos];
        code_point = 0x10000 + ((leading_surrogate - 0xD800) << 10) + (trailing_surrogate - 0xDC00);
    }
    print_code_point_to_utf8_file(file, code_point);
    return pos;
}

bool UnicodeUtilities_is_utf16_surrogate(const wchar_t wide_char) {
    return wide_char >= 0xD800 && wide_char < 0xE000;
}

void print_code_point_to_utf8_file(FILE* file, long code_point) {
    int trailing_bytes;
    if (code_point < 0x80) {
        fputc((char)code_point, file);
        return;
    } else if (code_point < 0x800) {
        fputc((char)(0xC0 | ((code_point & 0x7C0) >> 6)), file);
        trailing_bytes = 1;
    } else if (code_point < 0x10000) {
        fputc((char)(0xE0 | ((code_point & 0xF000) >> 12)), file);
        trailing_bytes = 2;
    } else if (code_point < 0x200000) {
        fputc((char)(0xF0 | ((code_point & 0x1C0000) >> 18)), file);
        trailing_bytes = 3;
    } else if (code_point < 0x4000000) {
        fputc((char)(0xF8 | ((code_point & 0x3000000) >> 24)), file);
        trailing_bytes = 4;
    } else {
        fputc((char)(0xFC | ((code_point & 0x40000000) >> 30)), file);
        trailing_bytes = 5;
    }
    switch (trailing_bytes) {
    case 5:
        fputc((char)(0x80 | ((code_point & 0x3F000000) >> 24)), file);
        /* fall through */
    case 4:
        fputc((char)(0x80 | ((code_point & 0xFC0000) >> 18)), file);
        /* fall through */
    case 3:
        fputc((char)(0x80 | ((code_point & 0x3F000) >> 12)), file);
        /* fall through */
    case 2:
        fputc((char)(0x80 | ((code_point & 0xFC0) >> 6)), file);
        /* fall through */
    case 1:
        fputc((char)(0x80 | (code_point & 0x3F)), file);
    }
}
