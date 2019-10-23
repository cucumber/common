# Cucumber JSON Formatter

This formatter produces JSON output similar to the legacy `--format=json` formatter. It reads cucumber messages from STDIN and writes a JSON report to STDOUT. It is intended to be used as a post-processor for the output of the new `protobuf` formatter that we're adding to all Cucumber implementations:

    cucumber --format protobuf:cucumber-results.bin
    cat cucumber-results.bin | cucumber-json-formatter > cucumber-results.json

The purpose is to provide backwards compatibility for tools that consume the JSON report after native JSON formatters have been removed from Cucumber.

The formatter is a command line tool implemented in Go, and cross-compiled for
several platforms.

The `ruby` and `javascript` directories contain code to generate test data. They
are *not* implementations of the json formatter.

## Trying it out

    ../fake-cucumber/javascript/bin/fake-cucumber \
    --results=random \
    ../gherkin/testdata/good/*.feature \ | 
    go/dist/json-formatter-darwin-amd64

