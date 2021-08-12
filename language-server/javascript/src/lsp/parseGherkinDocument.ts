import { GherkinDocument } from "@cucumber/messages";


import { AstBuilder, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin'
import { IdGenerator } from '@cucumber/messages'

const uuidFn = IdGenerator.uuid()
const builder = new AstBuilder(uuidFn)
const matcher = new GherkinClassicTokenMatcher()

const parser = new Parser(builder, matcher)

export default function parseGherkinDocument(gherkinSource: string): GherkinDocument {
  return parser.parse(gherkinSource)
}
