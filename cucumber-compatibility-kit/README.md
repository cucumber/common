# Cucumber Compatibility Kit

The CCK is a platform agnostic set of acceptance tests for validating a Cucumber 
implementation.

## Overview

This test suite does not aim to use Cucumber to describe Cucumber. The Gherkin
documents do not contain doc strings with other Gherkin documents and support code.
It's not that meta. (That style has been used for older Cucumber implementations.
It's clunky to deal with).

This test suite is just a set of plain gherkin documents (feature files) and 
support code (step definitions and hooks).

The test suite *exercises* various features of Cucumber (hopefully all of them).
For example there is a feature with some tags and we're verifying that only some
of them are executed.

The "golden master" is based on `fake-cucumber` (maybe to be renamed to something
more official-sounding), where the support code is implemented in TypeScript.

In order to use the TCK with another Cucumber implementation, this TypeScript
support code must be ported to the target platform. Then, if the implementation is
compliant, it will output messages that are equivalent to the golden master.

We say equivalent, because we allow certain fields to be different from the golden
master:

* `SourceReference` fields used in support code messages
* `Duration` and `Timestamp` fields
* `id` fields
* `StackTrace` fields (todo: new message)

These fields are normalised before comparison using `JSON.parse` with a custom
reviver.

The test suite doesn't make assertions *about* the messages, it just compares them.
The messages for the golden master should be inspected manually before being committed.

## Packaging

The `cucumber-cck` module is packaged and distributed in several formats (currently
rubygem, jar and NPM module). The module contains the following files:

* `.feature` files (input)
* `.ndjson` files (expected output)

The validation can be done with the `cucumber-cck` CLI, which performs the normalisation
described above, and compares the expected output to the actual output and generates a report.

## Reporting

Compliance with the CCK isn't all or nothing. Partial compliance is possible.
The `cucumber-cck` can be passed two directories (containing expected and actual message files),
and it will produce a `cucumber-cck.json` document describing the compliance level.

A Markdown file or other presentation format can be generated from multiple `cucumber-cck.json`
files (for multiple implementations). This provides user as well as contributors
with an overview of what's implemented, and what still needs some work.

## What's tested

The test suite validates that the following functionality is properly implemented

* Tags
  * Conditional hooks (formerly tagged hooks)
  * The `--tags` option
* Hooks
  * Before
  * After
    * That they always run, regardless of previous failures
* World
* Attachments
  * Text
  * Binary
* Cucumber Expressions
  * Custom Parameter Types
* Snippets
  * Print them
  * Templateable
* Gherkin
  * Tags
  * Rules
  * Examples tables
  * Data tables
  * Doc strings
* Timeouts
* Stack traces
  * Filter stack trace
  * Show relative paths

## Configuration

The CCK works by comparing the golden master NDJSON files against files generated
by the Cucumber implementation being tested. This means we need to remove any
unpredictability from the output such as:

* Random messages ids (UUIDs)
* Unpredictable timestamps and durations
* Platform-specific error messages (stack traces)

To enable this we specify the `--cck` option, which will:
* Use predictable ids (a counter starting at 1)
* Use a clock that starts on 1000000 millis and increments by 1ms each time it is asked.
  All durations are 1ms.
* Renders errors with only the error message, and not the stack trace.
  