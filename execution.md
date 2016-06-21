# Execution

When Cucumber runs, different things happen at different times:

## Configuration

The first thing that happens is to create a configuration for Cucumber.
This can come from a variety of sources:

* Command-line arguments
* Configuration files (JSON, YAML or TOML)
* Configuration code

The configuration is a set of parameters telling Cucumber how it should
behave, such as:

* What plugins to load (such as formatter plugins)
* What features and scenarios to run (using file paths, tags or line numbers)
* What step definitions to use
* Whether or not undefined and pending steps are reported as errors
* Test plan strategy (randomise order, distribute scenarios across threads or processes)

## Load glue code (Step Definitions and Hooks)

The user's step definitions and hooks are loaded and stored in
memory, inside a `Glue` object.

## Load executable specifications (Gherkin or Markdown)

The Gherkin3 library is used to load specifications. For
specification written in Markdown, the step definitions
are passed to the Markdown parser, because it needs the
step definitions' patterns to parse the Markdown.

The specifications are transformed to an AST (Abstract Syntax Tree).

## Compile scenarios into bare TestCases

The ASTs are compiled into a list of TestCases. During this phase,
Scenario Outlines and their Examples are exploded into multiple Test
Cases. Background steps are copied into each TestCase.

## Linking Step Definitions into executable TestCases

Each TestCase is linked to matching Step Definitions. This connects
each TestCase to the body of the matching Step Definition.

## Create test executors

Depending on the configuration there may be a single test executor,
or multiple ones if test cases are meant to be distributed across
threads or separate processes.

Test executors are configured with a scheduler, which decides in
what order the test cases should be run. They might run sequentially
as defined on disk, or they may be randomised. Special scheduler
plugins may be provided to run scenarios in a particular order
using an algorithm that runs test cases that are more likely to fail
first.

## Start test executors

This is when the test cases are run. Results are picked up by a
ResultCollector, which passes on results to configured reporter
plugins.

## Finish and report summary

When all test executors have finished running their test cases,
Cucumber reports a summary of the run (to STDOUT), and exits
with 0 or 1, depending on whether or not there were any failures.
