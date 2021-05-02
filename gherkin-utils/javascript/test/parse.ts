import * as messages from '@cucumber/messages'
import { AstBuilder, Parser, TokenMatcher } from '@cucumber/gherkin'

export default function parse(source: string): messages.GherkinDocument {
  const newId = messages.IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId), new TokenMatcher())
  const gherkinDocument = parser.parse(source)
  gherkinDocument.uri = ''
  return gherkinDocument
}
