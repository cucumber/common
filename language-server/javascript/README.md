# Cucumber LSP

A [Language Server](https://langserver.org/) for Cucumber.

## Supported features

* [x] Code completion
* [x] Syntax validation
* [ ] [Semantic tokens](https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens) (syntax highlighting)
  - See https://github.com/rcjsuen/dockerfile-language-service/blob/master/src/dockerSemanticTokens.ts

## TODO

* [ ] Adopt the style from https://github.com/rcjsuen/dockerfile-language-service so it can be used in e.g. Monaco on the web
* [ ] Split up in language service and language server as in https://github.com/rcjsuen/dockerfile-language-server-nodejs
