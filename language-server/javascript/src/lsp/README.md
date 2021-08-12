# Cucumber LSP Service

The functions in this directory use the LSP types without depending on the server implementation.
They could be extracted to a separate `@cucumber/lsp` module that can be used
directly in a browser without depending on a full LSP server.
