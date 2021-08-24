# Cucumber LSP

A [Language Server](https://langserver.org/) for Cucumber.

## Supported features

- [ ] Handle parse errors
- [x] Code completion
- [x] Syntax validation
  - [x] Parse errors
  - [x] Undefined steps
  - [ ] Ambiguous steps
  - [ ] Ignore Scenario Outline steps
- [x] [Semantic tokens](https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens) (syntax highlighting)
  - [x] Gherkin keywords
  - [x] Gherkin step parameters
  - [x] DocStrings
  - [x] Data tables
  - [x] Tags
  - [x] Scenario Outline step <placeholders>
  - [x] Examples tables headers (bold)
