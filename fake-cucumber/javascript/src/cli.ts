import { Command } from 'commander'
import packageJson from '../package.json'
import gherkin from 'gherkin'
import { pipeline } from 'stream'
import CucumberStream from './CucumberStream'
import { promisify } from 'util'
import formatStream from './cli/formatStream'
import glob from 'glob'
import * as tsnode from 'ts-node'
import SupportCode from './SupportCode'
import Dsl from './dsl/dsl'

tsnode.register({
  transpileOnly: true,
})

const pipelinePromise = promisify(pipeline)
const globPromise = promisify(glob)

const program = new Command()
program.version(packageJson.version)
program.option(
  '-f, --format <format>',
  'output format: ndjson|protobuf',
  'protobuf'
)
program.parse(process.argv)
const paths = program.args

async function readSupportCode(): Promise<SupportCode> {
  const supportCodePaths = await globPromise(`${process.cwd()}/features/*.ts`)
  for (const supportCodePath of supportCodePaths) {
    require(supportCodePath)
  }
  return Dsl
}

readSupportCode()
  .then(
    supportCode =>
      new CucumberStream(supportCode.stepDefinitions, supportCode.hooks)
  )
  .then(cucumberStream => {
    pipelinePromise(
      gherkin.fromPaths(paths, {}),
      cucumberStream,
      formatStream(program.format),
      process.stdout
    )
  })
  .catch(err => {
    // tslint:disable-next-line:no-console
    console.error(err)
    process.exit(1)
  })
