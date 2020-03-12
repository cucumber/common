# Cucumber Pretty Formatter for Go

This formatter pretty-prints Feature files.

It's a simple command line program that reads results from `STDIN` and
writes the result to `STDOUT`.

The `STDIN` must contain `varint`-delimited protobuf messages.

## Building

Just one command:

    make .deps

This should download dependencies, run tests and build the executable.

## Trying it out

The tests leave behind `*.bin` files, which contain protobuf messages. They can be piped
to the executable to see the result:

    cat all-results.bin | bin/cucumber-pretty-formatter


# Design

The formatter can operate in two modes:

- Without results (for pretty formatting source code)
- With results (for pretty formatting results as source code)