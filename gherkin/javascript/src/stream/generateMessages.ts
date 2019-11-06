import Parser from '../Parser'
import TokenMatcher from '../TokenMatcher'
import { messages } from 'cucumber-messages'
import { gherkinOptions, IGherkinOptions } from '../types'
import compile from '../pickles/compile'
import AstBuilder from '../AstBuilder'

export default function generateMessages(
  data: string,
  uri: string,
  options: IGherkinOptions
) {
  const result = []

  const opts = gherkinOptions(options)

  try {
    if (opts.includeSource) {
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

    if (!opts.includeGherkinDocument && !opts.includePickles) {
      return result
    }

    const parser = new Parser(new AstBuilder(options.newId))
    parser.stopAtFirstError = false
    const gherkinDocument = parser.parse(
      data,
      new TokenMatcher(opts.defaultDialect)
    )

    if (opts.includeGherkinDocument) {
      result.push(
        messages.Envelope.fromObject({
          gherkinDocument: { ...gherkinDocument, uri },
        })
      )
    }

    if (opts.includePickles) {
      const pickles = compile(gherkinDocument, uri, options.newId)
      for (const pickle of pickles) {
        result.push(
          messages.Envelope.fromObject({
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
        messages.Envelope.fromObject({
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
