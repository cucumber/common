import { Command } from 'commander'
import packageJson from '../../package.json'
import gherkin from '../index'
import { IGherkinOptions } from '../types'
import { MessageToBinaryStream, MessageToNdjsonStream } from 'cucumber-messages'
import { Readable, Transform } from 'stream'
import { incrementing, uuid } from '../IdGenerator'

const program = new Command()
program.version(packageJson.version)
program.option('--no-source', 'Do not output Source messages', false)
program.option('--no-ast', 'Do not output GherkinDocument messages', false)
program.option('--no-pickles', 'Do not output Pickle messages', false)
program.option('--predictable-ids', 'Use predictable ids', false)
program.option(
  '-f, --format <format>',
  'output format: ndjson|protobuf',
  'protobuf'
)
program.parse(process.argv)
const paths = program.args

const options: IGherkinOptions = {
  defaultDialect: 'en',
  includeSource: program.source,
  includeGherkinDocument: program.ast,
  includePickles: program.pickles,
  newId: program.predictableIds ? incrementing() : uuid(),
}

const messageStream =
  paths.length === 0
    ? gherkin.fromStream((process.stdin as unknown) as Readable, options)
    : gherkin.fromPaths(paths, options)

let encodedStream: Transform
switch (program.format) {
  case 'ndjson':
    encodedStream = new MessageToNdjsonStream()
    break
  case 'protobuf':
    encodedStream = new MessageToBinaryStream()
    break
  default:
    throw new Error(`Unsupported format: ${program.format}`)
}

messageStream.pipe(encodedStream).pipe(process.stdout)
