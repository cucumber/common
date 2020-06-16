import { IdGenerator, messages } from '@cucumber/messages'
import AstBuilder from '../../src/AstBuilder'
import Parser from '../../src/Parser'
import { compile } from '../../src'

export function parse(source: string, uri = ''): messages.IGherkinDocument {
  const newId = IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId))
  const gherkinDocument = parser.parse(source)

  gherkinDocument.uri = uri

  return gherkinDocument
}

export function parseAndCompile(
  source: string,
  messageHandler: (envelope: messages.IEnvelope) => void = () => null
) {
  const newId = IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId))
  const gherkinDocument = parser.parse(source)

  messageHandler(messages.Envelope.create({ gherkinDocument }))
  compile(gherkinDocument, '', newId).map((pickle) =>
    messageHandler(messages.Envelope.create({ pickle }))
  )

  return gherkinDocument
}
