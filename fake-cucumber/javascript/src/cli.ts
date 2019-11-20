import { Command } from 'commander'
import packageJson from '../package.json'
import gherkin from 'gherkin'
import { Transform, pipeline } from 'stream'
import {
  messages,
  ProtobufBinaryStream,
  ProtobufNdjsonStream,
} from 'cucumber-messages'
import CucumberStream from './CucumberStream'

const program = new Command()
program.version(packageJson.version)
program.option(
  '-f, --format <format>',
  'output format: ndjson|protobuf',
  'protobuf'
)
program.parse(process.argv)
const paths = program.args

async function run() {
  await pipeline(
    gherkin.fromPaths(paths, {}),
    new CucumberStream([]),
    formatStream(program.format),
    process.stdout,
    err => {
      // tslint:disable-next-line:no-console
      console.error(err)
      process.exit(1)
    }
  )
}

function formatStream(format: string): Transform {
  switch (format) {
    case 'ndjson':
      return new ProtobufNdjsonStream()
    case 'protobuf':
      return new ProtobufBinaryStream(messages.Envelope.encodeDelimited)
    default:
      throw new Error(`Unsupported format: '${format}'`)
  }
}

// tslint:disable-next-line:no-console
run().catch(console.error)
