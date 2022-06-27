# Cucumber Open Architecture

Each Cucumber Open implementation has its own GitHub repository:

* Ruby
* Java
* JavaScript
* Go
* Others...

All implementations are built on top of several components that live in the
cucumber/cucumber GitHub repository (this repository).

## Cucumber Open Components

In order of importance / relevance to most contributors (hopefully):

* `gherkin` - parser for Gherkin Documents (`.feature` files)
* `cucumber-expressions` - parser for Cucumber's Regular Expressions alternative
* `messages` - data structures for Cucumber Open's internal data model
* `datatable` - library for manipulating data in a data table. Used in Cucumber step definitions.
  * The Ruby and JavaScript implementations currently live in cucumber-ruby and cucumber-js respectively. They will stay there until the implementations
  have the same structure.
* `html-formatter` - HTML report generator used by multiple Cucumber Open implementations
* `react` - React components for rendering Gherkin Document and Cucumber results (represented as `messages`).
  Used by `cucumber-html` and https://reports.cucumber.io/
* `gherkin-utils` - utilities for traversing, querying and pretty printing Gherkin document abstract syntax trees (ASTs).
* `query` - utilities for linking results from Cucumber Open to the original source from Gherkin.
  This is useful because the decoupling of the Gherkin AST from Cucumber Results. Used by advanced formatter
  that output both the input document (Gherkin, Markdown) as well as the results.

## Miscellaneous Components

* `fake-cucumber` - a light Cucumber implementation written in TypeScript - used primarily
  for development and testing. Also used as basis for `json-to-messages`.
* `compatibility-kit` - test data used by multiple Cucumber Open implementations' acceptance tests.
* `json-formatter` - converts `messages` to the legacy JSON format.
* `json-to-messages` - converts legacy Cucumber JSON reports to the newer `messages` format. Allows older Cucumber versions to co-exist with newer tooling based on messages.
