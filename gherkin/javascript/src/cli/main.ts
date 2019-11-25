import gherkin from '../index'
import { IGherkinOptions } from '../types'
import { MessageToBinaryStream, MessageToNdjsonStream } from 'cucumber-messages'
import { Readable } from 'stream'
import { incrementing, uuid } from '../IdGenerator'

const args = process.argv.slice(2)
const options: IGherkinOptions = {
  defaultDialect: 'en',
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
  newId: uuid(),
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

    case '--predictable-ids':
      options.newId = incrementing()
      break

    default:
      paths.push(arg)
  }
}

const messageStream =
  paths.length === 0
    ? gherkin.fromStream((process.stdin as unknown) as Readable, options)
    : gherkin.fromPaths(paths, options)

const encodedStream = json
  ? messageStream.pipe(new MessageToNdjsonStream())
  : messageStream.pipe(new MessageToBinaryStream())

encodedStream.pipe(process.stdout)
