# Cucumber Compatibility Kit

The CCK is a platform agnostic set of acceptance tests for validating a Cucumber 
implementation.

It consists of a set of the following files:

* `.feature` files
* support code (step definitions and hooks)
* `.ndjson` files

The `.feature` files and support code are the input. The `.ndjson` files
are the expected output.

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
  