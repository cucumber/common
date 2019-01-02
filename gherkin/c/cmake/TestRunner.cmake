# This script expects 3 variables to be set when called
#
#   GHERKINEXE: Path to the `gherkinexe` executable
#   GHERKIN_GENERATE_TOKENS: Path to the `gherkin_generate_tokens` executable
#   FEATUREFILE: Path to the feature file to run on

get_filename_component(FEATUREFILE_DIRECTORY ${FEATUREFILE} DIRECTORY)
get_filename_component(GOOD_OR_BAD ${FEATUREFILE_DIRECTORY} NAME)

if (GOOD_OR_BAD STREQUAL "good")
    set(EXPECT_ERROR FALSE)
else()
    set(EXPECT_ERROR TRUE)
endif()

get_filename_component(PROJECT_ROOT "${FEATUREFILE_DIRECTORY}/../.." REALPATH)

# ensure FEATUREFILE is a relative path w.r.t PROJECT_ROOT
# this is required because the expected output assumes the uris are relative
if (IS_ABSOLUTE ${FEATUREFILE})
    file(RELATIVE_PATH FEATUREFILE ${PROJECT_ROOT} ${FEATUREFILE})
endif()

# in a first step check that the feature file can be parsed successfully
# if and only if we expect it to be parsed successfully
execute_process(COMMAND ${GHERKINEXE} --no-pickles --no-ast --no-source ${FEATUREFILE}
                RESULT_VARIABLE HAD_ERROR
                WORKING_DIRECTORY ${PROJECT_ROOT}
)

if(HAD_ERROR AND NOT EXPECT_ERROR)
    message(FATAL_ERROR "Parsing failed unexpectedly.")
endif()
if (NOT HAD_ERROR AND EXPECT_ERROR)
    message(FATAL_ERROR "Expected parse failure but parsing was successful.")
endif()

# if the `diff` and `jq` utilities are available do a thorough comparison of
# expected parse results and actual results
find_program(DIFF diff)
find_program(JQ jq)
if (NOT (DIFF STREQUAL "DIFF-NOTFOUND") AND NOT(JQ STREQUAL "JQ-NOTFOUND"))
    # first, ensure that the output directories exists
    get_filename_component(OUTPUT_DIR ${PROJECT_ROOT}/acceptance/${FEATUREFILE} DIRECTORY)
    file(MAKE_DIRECTORY ${OUTPUT_DIR})

    if (NOT EXPECT_ERROR)
        # compare tokens
        execute_process(
            COMMAND ${GHERKIN_GENERATE_TOKENS} ${FEATUREFILE}
            COMMAND ${DIFF} --unified --strip-trailing-cr - ${FEATUREFILE}.tokens
            WORKING_DIRECTORY ${PROJECT_ROOT}
            RESULT_VARIABLE DIFFERENT_TOKENS
        )

        # compare AST
        execute_process(
            COMMAND ${GHERKINEXE} --no-source --no-pickles ${FEATUREFILE}
            COMMAND ${JQ} --sort-keys "."
            WORKING_DIRECTORY ${PROJECT_ROOT}
            OUTPUT_FILE ${PROJECT_ROOT}/acceptance/${FEATUREFILE}.ast.ndjson
            OUTPUT_QUIET
        )
        execute_process(
            COMMAND ${JQ} --sort-keys "." ${FEATUREFILE}.ast.ndjson
            COMMAND ${DIFF} --unified --strip-trailing-cr - acceptance/${FEATUREFILE}.ast.ndjson
            WORKING_DIRECTORY ${PROJECT_ROOT}
            RESULT_VARIABLE DIFFERENT_AST
        )

        # compare pickles
        execute_process(
            COMMAND ${GHERKINEXE} --no-source --no-ast ${FEATUREFILE}
            COMMAND ${JQ} --sort-keys "."
            WORKING_DIRECTORY ${PROJECT_ROOT}
            OUTPUT_FILE ${PROJECT_ROOT}/acceptance/${FEATUREFILE}.pickles.ndjson
            OUTPUT_QUIET
        )
        execute_process(
            COMMAND ${JQ} --sort-keys "." ${FEATUREFILE}.pickles.ndjson
            COMMAND ${DIFF} --unified --strip-trailing-cr - acceptance/${FEATUREFILE}.pickles.ndjson
            WORKING_DIRECTORY ${PROJECT_ROOT}
            RESULT_VARIABLE DIFFERENT_PICKLES
        )

        # compare source
        execute_process(
            COMMAND ${GHERKINEXE} --no-ast --no-pickles ${FEATUREFILE}
            COMMAND ${JQ} --sort-keys "."
            OUTPUT_FILE ${PROJECT_ROOT}/acceptance/${FEATUREFILE}.source.ndjson
            WORKING_DIRECTORY ${PROJECT_ROOT}
            OUTPUT_QUIET
        )
        execute_process(
            COMMAND ${JQ} --sort-keys "." ${FEATUREFILE}.source.ndjson
            COMMAND ${DIFF} --unified --strip-trailing-cr - acceptance/${FEATUREFILE}.source.ndjson
            WORKING_DIRECTORY ${PROJECT_ROOT}
            RESULT_VARIABLE DIFFERENT_SOURCE
        )

        if(DIFFERENT_TOKENS OR DIFFERENT_AST OR DIFFERENT_PICKLES OR DIFFERENT_SOURCE)
            message(FATAL_ERROR "Test failed.")
        endif()
    else(NOT EXPECT_ERROR)
        # compare errors
        execute_process(
            COMMAND ${GHERKINEXE} --no-source --no-pickles ${FEATUREFILE}
            COMMAND ${JQ} --sort-keys "."
            OUTPUT_FILE ${PROJECT_ROOT}/acceptance/${FEATUREFILE}.errors.ndjson
            WORKING_DIRECTORY ${PROJECT_ROOT}
            OUTPUT_QUIET
        )

        execute_process(
            COMMAND ${JQ} --sort-keys "." ${FEATUREFILE}.errors.ndjson
            COMMAND ${DIFF} --unified --strip-trailing-cr - acceptance/${FEATUREFILE}.errors.ndjson
            WORKING_DIRECTORY ${PROJECT_ROOT}
            RESULT_VARIABLE DIFFERENT_ERRORS
        )

        if (DIFFERENT_ERRORS)
            message(FATAL_ERROR "Test failed.")
        endif()
    endif()
endif()
