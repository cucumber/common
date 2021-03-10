import { Command } from 'commander'
import packageJson from '../../package.json'
import GherkinStreams from '../GherkinStreams'
import { IdGenerator } from '@cucumber/messages'
import { MessageToBinaryStream, MessageToNdjsonStream } from '@cucumber/message-streams'
import { Readable, Transform } from 'stream'
import { IGherkinOptions } from '@cucumber/gherkin'

const program = new Command()
program.version(packageJson.version)
program.option('--no-source', 'Do not output Source messages', false)
program.option('--no-ast', 'Do not output GherkinDocument messages', false)
program.option('--no-pickles', 'Do not output Pickle messages', false)
program.option('--predictable-ids', 'Use predictable ids', false)
program.option('-f, --format <format>', 'output format: ndjson|protobuf', 'protobuf')
program.parse(process.argv)
const paths = program.args

const options: IGherkinOptions = {
  defaultDialect: 'en',
  includeSource: program.opts().source,
  includeGherkinDocument: program.opts().ast,
  includePickles: program.opts().pickles,
  newId: program.opts().predictableIds ? IdGenerator.incrementing() : IdGenerator.uuid(),
}

const messageStream =
  paths.length === 0
    ? GherkinStreams.fromStream((process.stdin as unknown) as Readable, options)
    : GherkinStreams.fromPaths(paths, options)

let encodedStream: Transform
switch (program.opts().format) {
  case 'ndjson':
    encodedStream = new MessageToNdjsonStream()
    break
  case 'protobuf':
    encodedStream = new MessageToBinaryStream()
    break
  default:
    throw new Error(`Unsupported format: ${program.opts().format}`)
}

messageStream.pipe(encodedStream).pipe(process.stdout)
