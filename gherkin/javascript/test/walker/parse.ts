import { IdGenerator, messages } from '@cucumber/messages'
import AstBuilder from '../../src/AstBuilder'
import Parser from '../../src/Parser'

export default function parse(
  source: string,
  uri = ''
): messages.IGherkinDocument {
  const newId = IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId))
  const gherkinDocument = parser.parse(source)

  gherkinDocument.uri = uri

  return gherkinDocument
}
