/**
 * Generates an [LSP Completion Snippet]{@link https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#snippet_syntax}
 *
 * @param expression the expression to generate the snippet from
 */
import { StepDocument } from './types'

export default function lspCompletionSnippet(expression: StepDocument): string {
  let n = 1
  return expression.map((segment) => Array.isArray(segment) ? lspPlaceholder(n++, segment) : segment).join('')
}

function lspPlaceholder(i: number, choices: readonly string[]) {
  return `\${${i}|${choices.join(',')}|}`
}

