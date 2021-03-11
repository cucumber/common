import Parser from './Parser'
import TokenMatcher from './TokenMatcher'
import * as messages from '@cucumber/messages'
import compile from './pickles/compile'
import AstBuilder from './AstBuilder'
import IGherkinOptions from './IGherkinOptions'
import makeSourceEnvelope from './makeSourceEnvelope'

export default function generateMessages(
  data: string,
  uri: string,
  options: IGherkinOptions
): readonly messages.Envelope[] {
  const result = []

  try {
    if (options.includeSource) {
      result.push(makeSourceEnvelope(data, uri))
    }

    if (!options.includeGherkinDocument && !options.includePickles) {
      return result
    }

    const parser = new Parser(
      new AstBuilder(options.newId),
      new TokenMatcher(options.defaultDialect)
    )
    parser.stopAtFirstError = false
    const gherkinDocument = parser.parse(data)

    if (options.includeGherkinDocument) {
      result.push({
        gherkin_document: { ...gherkinDocument, uri },
      })
    }

    if (options.includePickles) {
      const pickles = compile(gherkinDocument, uri, options.newId)
      for (const pickle of pickles) {
        result.push({
          pickle,
        })
      }
    }
  } catch (err) {
    const errors = err.errors || [err]
    for (const error of errors) {
      if (!error.location) {
        // It wasn't a parser error - throw it (this is unexpected)
        throw error
      }
      result.push({
        parse_error: {
          source: {
            uri,
            location: {
              line: error.location.line,
              column: error.location.column,
            },
          },
          message: error.message,
        },
      })
    }
  }
  return result
}
