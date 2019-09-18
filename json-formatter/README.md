# Cucumber JSON Formatter

This formatter produces JSON output similar to the legacy `--format=json` formatter.

<<<<<<< HEAD
=======
The formatter is a command line tool implemented in Go, and cross-compiled for
several platforms.

The `ruby` and `javascript` directories contain code to generate test data. They
are *not* implementations of the json formatter.

>>>>>>> master
## Trying it out

    ../fake-cucumber/javascript/bin/fake-cucumber \
    --results=random \
    ../gherkin/testdata/good/*.feature \ | 
    go/dist/json-formatter-darwin-amd64

