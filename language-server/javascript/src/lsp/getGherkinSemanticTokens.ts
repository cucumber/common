import { SemanticTokens } from 'vscode-languageserver-types'

// https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens
export function getGherkinSemanticTokens(gherkinSource: string): SemanticTokens {
  const semanticTokens: SemanticTokens = {
    data: [
      0, 0, 7, 0, 0,
      2, 2, 8, 0, 0
    ]
  }
  return semanticTokens
}
