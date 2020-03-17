import { IdGenerator, messages } from '@cucumber/messages'
import Parser from '@cucumber/gherkin/dist/src/Parser'
import AstBuilder from '@cucumber/gherkin/dist/src/AstBuilder'

export default function parse(source: string): messages.IGherkinDocument {
  const newId = IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId))
  return parser.parse(source)
}
