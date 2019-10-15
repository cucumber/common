# Cucumber JSON Formatter

This formatter produces JSON output similar to the legacy `--format=json` formatter. It reads cucumber messages from STDIN and writes a JSON report to STDOUT. The purpose is to provide backwards compatibility for tools that consume the JSON report after native JSON formatters have been removed from Cucumber.

The formatter is a command line tool implemented in Go, and cross-compiled for
several platforms.

The `ruby` and `javascript` directories contain code to generate test data. They
are *not* implementations of the json formatter.

## Trying it out

    ../fake-cucumber/javascript/bin/fake-cucumber \
    --results=random \
    ../gherkin/testdata/good/*.feature \ | 
    go/dist/json-formatter-darwin-amd64

