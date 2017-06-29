#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <locale.h>
#include <wchar.h>

#include "file_reader.h"
#include "string_token_scanner.h"
#include "token_matcher.h"
#include "parser.h"
#include "ast_builder.h"
#include "compiler.h"
#include "gherkin_document_event.h"
#include "attachment_event.h"
#include "pickle_event.h"
#include "source_event.h"

typedef struct Options {
    bool print_source_events;
    bool print_ast_events;
    bool print_pickle_events;
} Options;

static Options parse_options(int argc, char** argv) {
    Options options = {true, true, true};
    int i;
    for (i = 1; i < argc; ++i) {
        if (strcmp("--no-source", argv[i]) == 0) {
            options.print_source_events = false;
            continue;
        }
        if (strcmp("--no-ast", argv[i]) == 0) {
            options.print_ast_events = false;
            continue;
        }
        if (strcmp("--no-pickles", argv[i]) == 0) {
            options.print_pickle_events = false;
            continue;
        }
        if (argv[i][0] == '-') {
            if (strcmp("-h", argv[i]) != 0 && strcmp("--help", argv[i]) != 0) {
                fprintf(stdout, "Unknown option: %s\n\n", argv[i]);
            }
            fprintf(stdout, "Usage: gherkin [options] FILE*\n");
            fprintf(stdout, "        -h, --help                             You're looking at it.\n");
            fprintf(stdout, "        --no-ast                               Do not emit Ast events.\n");
            fprintf(stdout, "        --no-pickles                           Do not emit Pickle events.\n");
            fprintf(stdout, "        --no-source                            Do not emit Source events.\n");
            exit(EXIT_SUCCESS);
        }
    }
    return options;
}

int main(int argc, char** argv) {
    setlocale(LC_ALL, "en_US.UTF-8");
    Options options = parse_options(argc, argv);
    TokenMatcher* token_matcher = TokenMatcher_new(L"en");
    Builder* builder = AstBuilder_new();
    Parser* parser = Parser_new(builder);
    Compiler* compiler = Compiler_new();
    int return_code = 0;
    int result_code = 0;
    int i;
    for (i = 1; i < argc; ++i) {
        if (argv[i][0] == '-') {
            continue;
        }
        FileReader* file_reader = FileReader_new(argv[i]);
        SourceEvent* source_event = SourceEvent_new(argv[i], FileReader_read(file_reader));
        FileReader_delete(file_reader);
        if (options.print_source_events) {
            Event_print((const Event*)source_event, stdout);
        }
        TokenScanner* token_scanner = StringTokenScanner_new(source_event->source);
        result_code = Parser_parse(parser, token_matcher, token_scanner);
        Event_delete((const Event*)source_event);
        if (result_code == 0) {
            const GherkinDocumentEvent* gherkin_document_event = GherkinDocumentEvent_new(argv[i], AstBuilder_get_result(builder));
            if (options.print_ast_events) {
                Event_print((const Event*)gherkin_document_event, stdout);
            }
            result_code = Compiler_compile(compiler, gherkin_document_event->gherkin_document);
            Event_delete((const Event*)gherkin_document_event);
            if (result_code == 0) {
                if (options.print_pickle_events) {
                    while (Compiler_has_more_pickles(compiler)) {
                        const Event* pickle_event = (const Event*)PickleEvent_new(argv[i], Compiler_next_pickle(compiler));
                        Event_print(pickle_event, stdout);
                        Event_delete(pickle_event);
                    }
                }
            }
            else {
                return_code = result_code;
            }
        }
        else {
            return_code = result_code;
            while (Parser_has_more_errors(parser)) {
                Error* error = Parser_next_error(parser);
                AttachmentEvent* attachment_event = AttachmentEvent_new(argv[i], error->location);
                AttacnmentEvent_transfer_error_text(attachment_event, error);
                Event_print((Event*)attachment_event, stdout);
                Event_delete((Event*)attachment_event);
                Error_delete(error);
            }
        }
        TokenScanner_delete(token_scanner);
    }
    Compiler_delete(compiler);
    Parser_delete(parser);
    AstBuilder_delete(builder);
    TokenMatcher_delete(token_matcher);
    return return_code;
}
