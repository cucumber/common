module.exports = {
  default: "--publish-quiet --require features/support/env.js --require 'features/**/*.ts' README.md",
  lsp:     "--publish-quiet --require features/support/env.js --require 'features/**/*.ts' README.md --dry-run --format message",
}
