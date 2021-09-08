# Cucumber Language Service

This library implements the services used by [Cucumber Language Server](../../language-server/javascript)
and [Cucumber Monaco](../../monaco/javascript).

## Supported features

- [x] Formatting / pretty printing
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
