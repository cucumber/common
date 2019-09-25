import Parser from '../Parser'
import Crypto from 'crypto'
import TokenMatcher from '../TokenMatcher'
import { messages } from 'cucumber-messages'
import { gherkinOptions, IGherkinOptions } from '../types'
import compile from '../pickles/compile'

function numberToInt32LE(value: number) {
  const buffer = Buffer.allocUnsafe(4)
  buffer.writeInt32LE(value, 0)
  return buffer
}

function makeId(data: string, locations: messages.ILocation[]) {
  const shasum = Crypto.createHash('sha1')
  shasum.update(Buffer.from(data))
  for (const loc of locations) {
    shasum.update(numberToInt32LE(loc.line))
    shasum.update(numberToInt32LE(loc.column))
  }
  return shasum.digest('hex')
}

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

    const parser = new Parser()
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
      const pickles = compile(gherkinDocument)
      for (const pickle of pickles) {
        const id = makeId(data, pickle.locations)
        result.push(
          messages.Envelope.fromObject({
            pickle: { ...pickle, id, uri },
          })
        )
      }
    }
  } catch (err) {
    const errors = err.errors || [err]
    for (const error of errors) {
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
