import {AstBuilder, Parser, GherkinInMarkdownTokenMatcher } from '@cucumber/gherkin'
import {IdGenerator, GherkinDocument } from '@cucumber/messages'

type Result = {
  gherkinDocument?: GherkinDocument
  error?: Error
}

export default function useGherkinDocument(markdown: string): Result {
  const parser = new Parser(new AstBuilder(IdGenerator.uuid()), new GherkinInMarkdownTokenMatcher())
  let gherkinDocument: GherkinDocument
  try {
    gherkinDocument = parser.parse(markdown)
    return {gherkinDocument}
  } catch(error) {
    return {error}
  }
}
