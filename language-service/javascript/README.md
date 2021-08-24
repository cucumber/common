# Cucumber Language Service

This library implements the services provided by [Cucumber Language Server](../../language-server/javascript).

It is a standalone library that can also be used *without* the Cucumber Language Server,
for example in a browser.

## Supported features

- [x] Handle parse errors
- [x] Code completion
  - [x] Steps
  - [ ] Generic Gherkin keywords
- [x] Syntax validation
  - [x] Parse errors
  - [x] Undefined steps
  - [ ] Ambiguous steps
  - [x] Ignore Scenario Outline steps
- [x] [Semantic tokens](https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens) (syntax highlighting)
  - [x] Gherkin keywords
  - [x] Gherkin step parameters
  - [x] DocStrings
  - [x] Data tables
  - [x] Tags
  - [x] Scenario Outline step <placeholders>
  - [x] Examples tables headers
