GCC_FLAGS=-c -Wall -Werror -g
CLANG_FLAGS=-c -Wall -Wno-typedef-redefinition -Werror -g

ifeq ($(CC),i686-w64-mingw32-gcc)
	CC=i686-w64-mingw32-gcc
	LD=i686-w64-mingw32-gcc
	CC_FLAGS=$(GCC_FLAGS)
	AR=i686-w64-mingw32-ar
	EXT=.exe
else ifeq ($(CC),clang)
	CC=clang
	LD=clang
	CC_FLAGS=$(CLANG_FLAGS)
	AR=ar
else
	CC=gcc
	LD=gcc
	CC_FLAGS=$(GCC_FLAGS)
	AR=ar
endif
GENERATE_DEPS_FLAGS=-MMD -MP -MF $(basename $@).d
AR_FLAGS=cr
LD_FLAGS=
LD_LIBS=
RM_CMD=rm -rf
MKDIR_CMD=mkdir -p

all: \
    cli \
	../bin/gherkin_generate_tokens$(EXT)

cli: ../bin/gherkin$(EXT)

libs: ../libs/libgherkin.a

clean:
	$(RM_CMD) ../bin ../objs ../libs
.PHONY: clean

UTILITIES_OBJS= \
	../objs/file_reader.o \
	../objs/file_utf8_source.o \
	../objs/print_utilities.o \
	../objs/string_utilities.o \
	../objs/unicode_utilities.o \
	../objs/utf8_source.o
-include $(UTILITIES_OBJS:.o=.d)

PARSER_OBJS= \
	../objs/parser.o \
	../objs/token_scanner.o \
	../objs/file_token_scanner.o \
	../objs/string_token_scanner.o \
	../objs/token_matcher.o \
	../objs/token.o \
	../objs/token_queue.o \
	../objs/item_queue.o \
	../objs/gherkin_line.o \
	../objs/error.o \
	../objs/error_list.o \
	../objs/dialect.o
-include $(PARSER_OBJS:.o=.d)

AST_OBJS= \
	../objs/ast_builder.o \
	../objs/ast_node.o \
	../objs/gherkin_document.o \
	../objs/feature.o \
	../objs/scenario.o \
	../objs/scenario_outline.o \
	../objs/background.o \
	../objs/comment.o \
	../objs/data_table.o \
	../objs/doc_string.o \
	../objs/example_table.o \
	../objs/step.o \
	../objs/table_cell.o \
	../objs/table_row.o \
	../objs/tag.o
-include $(AST_OBJS:.o=.d)

COMPILER_OBJS= \
	../objs/compiler.o
-include $(COMPILER_OBJS:.o=.d)

PICKLES_OBJS= \
	../objs/pickle.o \
	../objs/pickle_cell.o \
	../objs/pickle_location.o \
	../objs/pickle_row.o \
	../objs/pickle_step.o \
	../objs/pickle_string.o \
	../objs/pickle_table.o \
	../objs/pickle_tag.o
-include $(PICKLES_OBJS:.o=.d)

EVENT_OBJS= \
	../objs/event.o \
	../objs/attachment_event.o \
	../objs/gherkin_document_event.o \
	../objs/pickle_event.o \
	../objs/source_event.o \
	../objs/ast_printer.o \
	../objs/pickle_printer.o
-include $(EVENT_OBJS:.o=.d)

GENERATE_TOKEN_OBJS= \
	../objs/token_formatter_builder.o \
	../objs/gherkin_generate_tokens.o
-include $(GENERATE_TOKEN_OBJS:.o=.d)

GHERKIN_CLI_OBJS= \
	../objs/gherkin_cli.o
-include $(GHERKIN_CLI_OBJS:.o=.d)

../objs/%.o: %.c Makefile
	$(MKDIR_CMD) $(dir $@)
	$(CC) $(CC_FLAGS) $(GENERATE_DEPS_FLAGS) -I ../include -I . $< -o $@

../libs/libgherkin.a: $(UTILITIES_OBJS) $(PARSER_OBJS) $(AST_OBJS) $(COMPILER_OBJS) $(PICKLES_OBJS) $(EVENT_OBJS) Makefile
	$(MKDIR_CMD) $(dir $@)
	$(AR) $(AR_FLAGS) $@ $(UTILITIES_OBJS) $(PARSER_OBJS) $(AST_OBJS) $(COMPILER_OBJS) $(PICKLES_OBJS) $(EVENT_OBJS)

../bin/gherkin_generate_tokens$(EXT): ../libs/libgherkin.a $(GENERATE_TOKEN_OBJS) Makefile
	$(MKDIR_CMD) $(dir $@)
	$(LD) $(LD_FLAGS) $(GENERATE_TOKEN_OBJS) -L../libs/ -lgherkin $(LD_LIBS) -o $@

../bin/gherkin$(EXT): ../libs/libgherkin.a $(GHERKIN_CLI_OBJS) Makefile
	$(MKDIR_CMD) $(dir $@)
	$(LD) $(LD_FLAGS) $(GHERKIN_CLI_OBJS) -L../libs/ -lgherkin $(LD_LIBS) -o $@
