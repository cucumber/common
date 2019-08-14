#include "unicode_utilities.h"

typedef struct Utf8Bytes {
    unsigned char byte_count;
    unsigned char bytes[5];
} Utf8Bytes;

static long get_code_point_from_utf16_surrogate(const wchar_t* text, int pos);

static void write_utf8_bytes_for_code_point(Utf8Bytes* utf8_bytes, long code_point);

static void print_code_point_to_utf8_file(FILE* file, Utf8Bytes* utf8_bytes);

static void print_code_point_to_utf8_buffer(unsigned char* buffer, Utf8Bytes* utf8_bytes);

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
        code_point = get_code_point_from_utf16_surrogate(text, pos++);
    }
    Utf8Bytes utf8_bytes;
    write_utf8_bytes_for_code_point(&utf8_bytes, code_point);
    print_code_point_to_utf8_file(file, &utf8_bytes);
    return pos;
}

int UnicodeUtilities_print_wide_character_to_utf8_buffer(unsigned char* buffer, const wchar_t* text, int pos) {
    long code_point;
    if (!UnicodeUtilities_is_utf16_surrogate(text[pos]) || sizeof(wchar_t) > 2) {
        code_point = (long)text[pos];
    } else {
        code_point = get_code_point_from_utf16_surrogate(text, pos++);
    }
    Utf8Bytes utf8_bytes;
    write_utf8_bytes_for_code_point(&utf8_bytes, code_point);
    print_code_point_to_utf8_buffer(buffer, &utf8_bytes);
    return utf8_bytes.byte_count;
}

bool UnicodeUtilities_is_utf16_surrogate(const wchar_t wide_char) {
    return wide_char >= 0xD800 && wide_char < 0xE000;
}

static long get_code_point_from_utf16_surrogate(const wchar_t* text, int pos) {
    long leading_surrogate = (long)text[pos];
    long trailing_surrogate = (long)text[pos + 1];
    return 0x10000 + ((leading_surrogate - 0xD800) << 10) + (trailing_surrogate - 0xDC00);
}

static void write_utf8_bytes_for_code_point(Utf8Bytes* utf8_bytes, long code_point) {
    if (code_point < 0x80) {
        utf8_bytes->bytes[0] = (unsigned char)code_point;
        utf8_bytes->byte_count = 1;
        return;
    } else if (code_point < 0x800) {
        utf8_bytes->bytes[0] = (unsigned char)(0xC0 | ((code_point & 0x7C0) >> 6));
        utf8_bytes->byte_count = 2;
    } else if (code_point < 0x10000) {
        utf8_bytes->bytes[0] = (unsigned char)(0xE0 | ((code_point & 0xF000) >> 12));
        utf8_bytes->byte_count = 3;
    } else if (code_point < 0x200000) {
        utf8_bytes->bytes[0] = (unsigned char)(0xF0 | ((code_point & 0x1C0000) >> 18));
        utf8_bytes->byte_count = 4;
    } else if (code_point < 0x4000000) {
        utf8_bytes->bytes[0] = (unsigned char)(0xF8 | ((code_point & 0x3000000) >> 24));
        utf8_bytes->byte_count = 5;
    } else {
        utf8_bytes->bytes[0] = (unsigned char)(0xFC | ((code_point & 0x40000000) >> 30));
        utf8_bytes->byte_count = 6;
    }
    int i = 1;
    switch (utf8_bytes->byte_count) {
    case 6:
        utf8_bytes->bytes[i++] = (unsigned char)(0x80 | ((code_point & 0x3F000000) >> 24));
        /* fall through */
    case 5:
        utf8_bytes->bytes[i++] = (unsigned char)(0x80 | ((code_point & 0xFC0000) >> 18));
        /* fall through */
    case 4:
        utf8_bytes->bytes[i++] = (unsigned char)(0x80 | ((code_point & 0x3F000) >> 12));
        /* fall through */
    case 3:
        utf8_bytes->bytes[i++] = (unsigned char)(0x80 | ((code_point & 0xFC0) >> 6));
        /* fall through */
    case 2:
        utf8_bytes->bytes[i++] = (unsigned char)(0x80 | (code_point & 0x3F));
    }
}

void print_code_point_to_utf8_file(FILE* file, Utf8Bytes* utf8_bytes) {
    int i;
    for (i = 0; i < utf8_bytes->byte_count; ++i) {
        fputc((char)utf8_bytes->bytes[i], file);
    }
}

void print_code_point_to_utf8_buffer(unsigned char* buffer, Utf8Bytes* utf8_bytes) {
    int i;
    for (i = 0; i < utf8_bytes->byte_count; ++i) {
        buffer[i] = utf8_bytes->bytes[i];
    }
}
