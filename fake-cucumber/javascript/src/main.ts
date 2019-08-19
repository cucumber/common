import * as gherkin from 'gherkin'
import FakeCucumberStream from './FakeCucumber'

const paths = process.argv.splice(2)

const format = process.env.FORMAT || 'json'

gherkin
  .fromPaths(paths)
  // @ts-ignore
  .pipe(new FakeCucumberStream(format))
  .pipe(process.stdout)
