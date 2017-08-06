# Execution

When Cucumber runs, different things happen at different times.
Here’s an overview of what happens.

## 1. Configuration

The first thing that happens is to create a configuration for Cucumber.
This can come from a variety of sources:

* Command-line arguments
* Configuration files (JSON, YAML, or TOML)
* Configuration code

The configuration is a set of parameters telling Cucumber how it should
behave, such as:

* Which plugins to load (such as formatter plugins)
* Which features and scenarios to run (using file paths, tags, or line numbers)
* Which step definitions to use
* Whether to report `undefined` and/or `pending` as errors
* Test plan strategy (randomise order, distribute scenarios across threads or processes)

## 2. Load glue code (Step Definitions and Hooks)

The user's Step Definitions and Hooks are loaded and stored in
memory, inside a `Glue` object.

## 3. Load executable specifications (Gherkin or Markdown)

The Gherkin3 library is used to load specifications. 

For specifications written in Markdown, the Step Definitions
are passed to the Markdown parser, because it needs the
Step Definitions' patterns to parse the Markdown.

The specifications are transformed to an AST (Abstract Syntax Tree).

## 4. Compile scenarios into bare `TestCase`s

The ASTs are compiled into a list of `TestCase`s. During this phase,
`Scenario Outline`s and their `Example`s are exploded into multiple 
`TestCase`s.  Background steps are copied into each `TestCase`.

## 5. Linking `StepDefinition`s into executable `TestCase`s

Each `TestCase` is linked to matching `StepDefinition`s. This connects
each `TestCase` to the body of the matching `StepDefinition`.

## 6. Create test executors

Depending on the configuration there may be a single test executor,
or multiple ones if test cases are meant to be distributed across
threads or separate processes.

Test executors are configured with a Scheduler, which decides in
what order the test cases should be run. They might run sequentially
as defined on disk, or they may be randomised. 

Special scheduler plugins may be provided to run Scenarios in a 
particular order using an algorithm that runs test cases that are 
more likely to fail first.

## 7. Start test executors

This is when the test cases are run. Results are picked up by a
`ResultCollector`, which passes on results to configured reporter
plugins.

## 8. Finish and report summary

When all test executors have finished running their test cases,
Cucumber reports a summary of the run (to `STDOUT`), and exits
with `0` or `1`, depending on whether or not there were any failures.
