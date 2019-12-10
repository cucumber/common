import Parser from '../Parser'
import TokenMatcher from '../TokenMatcher'
import { messages } from 'cucumber-messages'
import compile from '../pickles/compile'
import AstBuilder from '../AstBuilder'
import IGherkinOptions from '../IGherkinOptions'

export default function generateMessages(
  data: string,
  uri: string,
  options: IGherkinOptions
) {
  const result = []

  try {
    if (options.includeSource) {
      result.push(
        new messages.Envelope({
          source: {
            uri,
            data,
            media: {
              encoding: messages.Media.Encoding.UTF8,
              contentType: 'text/x.cucumber.gherkin+plain',
            },
          },
        })
      )
    }

    if (!options.includeGherkinDocument && !options.includePickles) {
      return result
    }

    const parser = new Parser(new AstBuilder(options.newId))
    parser.stopAtFirstError = false
    const gherkinDocument = parser.parse(
      data,
      new TokenMatcher(options.defaultDialect)
    )

    if (options.includeGherkinDocument) {
      result.push(
        messages.Envelope.create({
          gherkinDocument: { ...gherkinDocument, uri },
        })
      )
    }

    if (options.includePickles) {
      const pickles = compile(gherkinDocument, uri, options.newId)
      for (const pickle of pickles) {
        result.push(
          messages.Envelope.create({
            pickle,
          })
        )
      }
    }
  } catch (err) {
    const errors = err.errors || [err]
    for (const error of errors) {
      if (!error.location) {
        // It wasn't a parser error - throw it (this is unexpected)
        throw error
      }
      result.push(
        messages.Envelope.create({
          attachment: {
            source: {
              uri,
              location: {
                line: error.location.line,
                column: error.location.column,
              },
            },
            data: error.message,
          },
        })
      )
    }
  }
  return result
}
