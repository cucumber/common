import * as gherkin from 'gherkin'
import FakeTestResultsStream from './FakeTestResultsStream'

const paths = process.argv.splice(2)

const format = process.env.FORMAT || 'json'

// @ts-ignore
const fakeTestResultsStream = new FakeTestResultsStream(format)
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
