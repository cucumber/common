import fs from 'fs'
import { Command } from 'commander'
import packageJson from '../../package.json'
import Gherkin from '../stream/GherkinStreams'
import {
  MessageToBinaryStream,
  MessageToNdjsonStream,
  IdGenerator,
} from '@cucumber/messages'
import { Readable, Transform } from 'stream'
import IGherkinOptions from '../IGherkinOptions'

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
  newId: program.predictableIds
    ? IdGenerator.incrementing()
    : IdGenerator.uuid(),
  createReadStream: (path: string) =>
    fs.createReadStream(path, { encoding: 'utf-8' }),
}

const messageStream =
  paths.length === 0
    ? Gherkin.fromStream((process.stdin as unknown) as Readable, options)
    : Gherkin.fromPaths(paths, options)

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
