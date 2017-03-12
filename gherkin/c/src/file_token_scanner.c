#include "file_token_scanner.h"
#include "gherkin_line.h"
#include "file_utilities.h"
#include "string_utilities.h"
#include <stdlib.h>

typedef struct FileTokenScanner {
    TokenScanner token_scanner;
    int line;
    FILE* file;
    int buffer_size;
    wchar_t* buffer;
} FileTokenScanner;

static Token* FileTokenScanner_read(TokenScanner* token_scanner);

static void FileTokenScanner_delete(TokenScanner* token_scanner);

TokenScanner* FileTokenScanner_new(const char* const file_name) {
    FileTokenScanner* token_scanner = (FileTokenScanner*)malloc(sizeof(FileTokenScanner));
    token_scanner->token_scanner.read = &FileTokenScanner_read;
    token_scanner->token_scanner.delete = &FileTokenScanner_delete;
    token_scanner->line = 0;
    token_scanner->file = 0;
    token_scanner->file = fopen(file_name, "r");
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
    wchar_t c;
    do {
        c = FileUtilities_read_wchar_from_file(file_token_scanner->file);
        if (c != WEOF && c != L'\r' && c != L'\n') {
            file_token_scanner->buffer[pos++] = c;
            if (pos >= file_token_scanner->buffer_size - 1) {
                file_token_scanner->buffer_size *= 2;
                file_token_scanner->buffer = (wchar_t*)realloc(file_token_scanner->buffer, file_token_scanner->buffer_size * sizeof(wchar_t));
            }
        }
    } while (c != WEOF && c != L'\r' && c != L'\n');
    if (c == L'\r') {
        unsigned char next_char = fgetc(file_token_scanner->file);
        if (next_char != L'\n') {
            ungetc(next_char, file_token_scanner->file);
        }
    }
    file_token_scanner->buffer[pos] = L'\0';
    const GherkinLine* line;
    if (c != WEOF || pos != 0) {
        wchar_t* text = StringUtilities_copy_string_part(file_token_scanner->buffer, pos);
        line = GherkinLine_new(text, file_token_scanner->line);
    }
    else
        line = (GherkinLine*)0;
    return Token_new(line, file_token_scanner->line);
}
