import { Command } from 'commander'
import packageJson from '../package.json'
import * as gherkin from 'gherkin'
import FakeTestResultsStream from './FakeTestResultsStream'

const program = new Command()
program.version(packageJson.version)
program.option(
  '-f, --format <format>',
  'output format: json|ndjson|protobuf',
  'protobuf'
)
program.option(
  '-r, --results <results>',
  'generate results: none|random|pattern',
  'pattern'
)
program.parse(process.argv)

const paths = program.args

// @ts-ignore
const fakeTestResultsStream = new FakeTestResultsStream(
  program.format,
  program.results
)
fakeTestResultsStream.on('error', (err: Error) => exit(err))

gherkin
  .fromPaths(paths)
  .pipe(fakeTestResultsStream)
  .pipe(process.stdout)

function exit(err: Error) {
  // tslint:disable-next-line:no-console
  console.error(err)
  process.exit(1)
}
