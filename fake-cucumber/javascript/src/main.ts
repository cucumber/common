import { Command } from 'commander'
import packageJson from '../package.json'
import gherkin from 'gherkin'
import FakeTestResultsStream from './FakeTestResultsStream'
import { Transform } from 'stream'
import {
  messages,
  ProtobufBinaryStream,
  ProtobufNdjsonStream,
} from 'cucumber-messages'

const program = new Command()
program.version(packageJson.version)
program.option(
  '-f, --format <format>',
  'output format: ndjson|protobuf',
  'protobuf'
)
program.option(
  '-r, --results <results>',
  'generate results: none|random|pattern',
  'pattern'
)
program.parse(process.argv)

const paths = program.args

const fakeTestResultsStream = new FakeTestResultsStream(program.results)
fakeTestResultsStream.on('error', (err: Error) => exit(err))

let formatStream: Transform
switch (program.format) {
  case 'ndjson':
    formatStream = new ProtobufNdjsonStream()
    break
  case 'protobuf':
    formatStream = new ProtobufBinaryStream(messages.Envelope.encodeDelimited)
    break
  default:
    throw new Error(`Unsupported format: '${program.format}'`)
}

gherkin
  .fromPaths(paths, {})
  .pipe(fakeTestResultsStream)
  .pipe(formatStream)
  .pipe(process.stdout)

function exit(err: Error) {
  // tslint:disable-next-line:no-console
  console.error(err)
  process.exit(1)
}
