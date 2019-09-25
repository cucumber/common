import gherkin from '../index'
import { IGherkinOptions } from '../types'
import {
  messages,
  ProtobufBinaryStream,
  ProtobufNdjsonStream,
} from 'cucumber-messages'

const args = process.argv.slice(2)
const options: IGherkinOptions = {
  defaultDialect: 'en',
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
}
let json = false

const paths = []
while (args.length > 0) {
  const arg = args.shift()
  switch (arg) {
    case '--no-source':
      options.includeSource = false
      break

    case '--no-ast':
      options.includeGherkinDocument = false
      break

    case '--no-pickles':
      options.includePickles = false
      break

    case '--json':
      json = true
      break

    default:
      paths.push(arg)
  }
}

const messageStream =
  paths.length === 0
    ? gherkin.fromStream(process.stdin, options)
    : gherkin.fromPaths(paths, options)

const encodedStream = json
  ? messageStream.pipe(new ProtobufNdjsonStream())
  : messageStream.pipe(
      new ProtobufBinaryStream(
        messages.Envelope.encodeDelimited.bind(messages.Envelope)
      )
    )

encodedStream.pipe(process.stdout)
