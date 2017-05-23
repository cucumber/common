#include "file_token_scanner.h"
#include "file_utf8_source.h"
#include "gherkin_line.h"
#include "string_utilities.h"
#include "unicode_utilities.h"
#include <stdlib.h>

typedef struct FileTokenScanner {
    TokenScanner token_scanner;
    int line;
    FILE* file;
    Utf8Source* utf8_source;
    int buffer_size;
    wchar_t* buffer;
} FileTokenScanner;

static Token* FileTokenScanner_read(TokenScanner* token_scanner);

static void extend_buffer_if_needed(FileTokenScanner* token_scanner, int pos);

static void FileTokenScanner_delete(TokenScanner* token_scanner);

TokenScanner* FileTokenScanner_new(const char* const file_name) {
    FileTokenScanner* token_scanner = (FileTokenScanner*)malloc(sizeof(FileTokenScanner));
    token_scanner->token_scanner.read = &FileTokenScanner_read;
    token_scanner->token_scanner.delete = &FileTokenScanner_delete;
    token_scanner->line = 0;
    token_scanner->file = 0;
    token_scanner->file = fopen(file_name, "rb");
    token_scanner->utf8_source = FileUtf8Source_new(token_scanner->file);
    token_scanner->buffer_size = 128;
    token_scanner->buffer = (wchar_t*)malloc(token_scanner->buffer_size * sizeof(wchar_t));
    return (TokenScanner*) token_scanner;
}

static void FileTokenScanner_delete(TokenScanner* token_scanner) {
    if (!token_scanner) {
        return;
    }
    FileTokenScanner* file_token_scanner = (FileTokenScanner*)token_scanner;
    if (file_token_scanner->file)
        fclose(file_token_scanner->file);
    Utf8Source_delete(file_token_scanner->utf8_source);
    free((void*)file_token_scanner->buffer);
    free((void*)file_token_scanner);
}

static Token* FileTokenScanner_read(TokenScanner* token_scanner) {
    FileTokenScanner* file_token_scanner = (FileTokenScanner*)token_scanner;
    ++file_token_scanner->line;
    if (!file_token_scanner->file)
        return Token_new(0, file_token_scanner->line);
    if (feof(file_token_scanner->file))
        return Token_new(0, file_token_scanner->line);
    int pos = 0;
    long code_point;
    do {
        code_point = UnicodeUtilities_read_code_point_from_utf8_source(file_token_scanner->utf8_source);
        if (code_point != WEOF && code_point != L'\r' && code_point != L'\n') {
            if (code_point <= 0xFFFF || sizeof(wchar_t) > 2) {
                file_token_scanner->buffer[pos++] = (wchar_t)code_point;
                extend_buffer_if_needed(file_token_scanner, pos);
            } else {
                Utf16Surrogates surrogates = UnicodeUtilities_get_utf16_surrogates(code_point);
                file_token_scanner->buffer[pos++] = surrogates.leading;
                extend_buffer_if_needed(file_token_scanner, pos);
                file_token_scanner->buffer[pos++] = surrogates.trailing;
                extend_buffer_if_needed(file_token_scanner, pos);
            }
        }
    } while (code_point != WEOF && code_point != L'\r' && code_point != L'\n');
    if (code_point == L'\r') {
        unsigned char next_char = fgetc(file_token_scanner->file);
        if (next_char != L'\n') {
            ungetc(next_char, file_token_scanner->file);
        }
    }
    file_token_scanner->buffer[pos] = L'\0';
    const GherkinLine* line;
    if (code_point != WEOF || pos != 0) {
        wchar_t* text = StringUtilities_copy_string_part(file_token_scanner->buffer, pos);
        line = GherkinLine_new(text, file_token_scanner->line);
    }
    else
        line = (GherkinLine*)0;
    return Token_new(line, file_token_scanner->line);
}

static void extend_buffer_if_needed(FileTokenScanner* file_token_scanner, int pos){
    if (pos >= file_token_scanner->buffer_size - 1) {
        file_token_scanner->buffer_size *= 2;
        file_token_scanner->buffer = (wchar_t*)realloc(file_token_scanner->buffer, file_token_scanner->buffer_size * sizeof(wchar_t));
    }
}
