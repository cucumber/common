PROJECT(gherkin C)
cmake_minimum_required(VERSION 3.0)
enable_testing()

# Install library & headers in your directory
#SET(CMAKE_INSTALL_PREFIX  "")
set(CMAKE_POSITION_INDEPENDENT_CODE ON)
list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake")
LIST(APPEND GHERKIN_SRS
        src/file_reader.c
        src/file_utf8_source.c
        src/print_utilities.c
        src/string_utilities.c
        src/unicode_utilities.c
        src/utf8_source.c
        src/parser.c
        src/token_scanner.c
        src/file_token_scanner.c
        src/string_token_scanner.c
        src/token_matcher.c
        src/token.c
        src/token_queue.c
        src/item_queue.c
        src/gherkin_line.c
        src/error.c
        src/error_list.c
        src/dialect.c
        src/ast_builder.c
        src/ast_node.c
        src/gherkin_document.c
        src/feature.c
        src/rule.c
        src/scenario.c
        src/background.c
        src/comment.c
        src/data_table.c
        src/doc_string.c
        src/example_table.c
        src/step.c
        src/table_cell.c
        src/table_row.c
        src/tag.c
        src/compiler.c
        src/pickle.c
        src/pickle_cell.c
        src/pickle_id_creator.c
        src/pickle_location.c
        src/pickle_row.c
        src/pickle_step.c
        src/pickle_string.c
        src/pickle_table.c
        src/pickle_tag.c
        src/event.c
        src/attachment_event.c
        src/gherkin_document_event.c
        src/pickle_event.c
        src/source_event.c
        src/ast_printer.c
        src/pickle_printer.c
        )

LIST(APPEND GENERATE_TOKEN
        src/token_formatter_builder.c
        src/gherkin_generate_tokens.c
        )
LIST(APPEND GHERKIN_CLI
        src/gherkin_cli.c
        )


add_library(gherkin ${GHERKIN_SRS})
include(CheckLibraryExists)
CHECK_LIBRARY_EXISTS(m log10 "" HAVE_LIB_M)   
if (HAVE_LIB_M)  
    target_link_libraries(gherkin PRIVATE m)
endif (HAVE_LIB_M)
target_include_directories(gherkin PUBLIC
    "$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include;${CMAKE_CURRENT_SOURCE_DIR}/src>")

add_executable(gherkinexe ${GHERKIN_CLI})
target_link_libraries(gherkinexe gherkin)
target_include_directories(gherkinexe PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include ${CMAKE_CURRENT_SOURCE_DIR}/src)

add_executable(gherkin_generate_tokens ${GENERATE_TOKEN})
target_link_libraries(gherkin_generate_tokens gherkin)

file(GLOB GOOD_FEATURE_FILES
        ${CMAKE_CURRENT_SOURCE_DIR}/testdata/good/*.feature
        )
file(GLOB BAD_FEATURE_FILES
        ${CMAKE_CURRENT_SOURCE_DIR}/testdata/bad/*.feature
        )
add_custom_target(invo DEPENDS invo)
add_dependencies(invo gherkinexe)
FOREACH(ENTITY ${GOOD_FEATURE_FILES})
    string(REPLACE "${PROJECT_SOURCE_DIR}" "" TEST_NAME "${ENTITY}")
    add_test(NAME "${TEST_NAME}"
        COMMAND gherkinexe  ${ENTITY}
    )
ENDFOREACH()
add_custom_command(
    TARGET gherkinexe
    COMMENT "Run tests"
    POST_BUILD
    COMMAND ${CMAKE_CTEST_COMMAND} -C $<CONFIGURATION>
)
############ Installation section ############
set(include_install_dir "include")
set(lib_install_dir "lib/")
set(bin_install_dir "bin/")
set(config_install_dir "lib/cmake/")

set(project_config "${CMAKE_CURRENT_BINARY_DIR}/generated/${PROJECT_NAME}Config.cmake")
set(targets_export_name "${PROJECT_NAME}Targets")

set(namespace "${PROJECT_NAME}::")

configure_file("${PROJECT_SOURCE_DIR}/cmake/Config.cmake.in" "${project_config}" @ONLY)

# Install target (will install the library to specified CMAKE_INSTALL_PREFIX variable)
install(
  TARGETS gherkin
  EXPORT ${targets_export_name}
  ARCHIVE DESTINATION ${lib_install_dir}
  LIBRARY DESTINATION ${lib_install_dir}
  RUNTIME DESTINATION ${lib_install_dir}
  INCLUDES DESTINATION ${include_install_dir})

install(
  DIRECTORY "${PROJECT_SOURCE_DIR}/include/"
  DESTINATION ${include_install_dir}
  FILES_MATCHING PATTERN "*.*h")

install(
    FILES "${project_config}"
    DESTINATION "${config_install_dir}")

install(
    EXPORT "${targets_export_name}"
    NAMESPACE "${namespace}"
    DESTINATION "${config_install_dir}")
