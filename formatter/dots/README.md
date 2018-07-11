# Cucumber Dots Formatter

This formatter produces dots (`....F-U.....`) from Cucumber results.
It's a simple command line program that reads results from `STDIN` and
writes the result to `STDOUT`.

The `STDIN` must contain `varint`-delimited protobuf messages.

## Building

First, install dependencies:

    make .deps

If building from the monorepo, symlink the "messages" project to ${GOPATH}
Omit this step if building from a clone of the read-only [formatter-dots subrepo](https://github.com/cucumber/formatter-dots)

    make .deps-monorepo

Run test and build the executable:

    make

## Trying it out

The tests leave behind `*.bin` files, which contain protobuf messages. They can be piped
to the executable to see the result:

    cat all-results.bin | bin/cucumber-dots

