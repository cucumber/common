import { Command } from 'commander'
import packageJson from '../package.json'
import gherkin, { IGherkinOptions } from '@cucumber/gherkin'
import { pipeline } from 'stream'
import CucumberStream from './CucumberStream'
import { promisify } from 'util'
import formatStream from './formatStream'
import supportCode from './index'
import { IdGenerator } from '@cucumber/messages'
import findSupportCodePaths from './findSupportCodePaths'
import fs from 'fs'
import IncrementClock from './IncrementClock'
import { withSourceFramesOnlyStackTrace } from './ErrorMessageGenerator'

const pipelinePromise = promisify(pipeline)

const program = new Command()
program.version(packageJson.version)
program.option('-r, --require <path>', 'override require path')
program.option('--predictable-ids', 'Use predictable ids', false)
program.option(
  '--globals',
  'Assign Given/When/Then/After/Before to global scope',
  false
)
program.option(
  '-f, --format <format>',
  'output format: ndjson|protobuf',
  'protobuf'
)
program.parse(process.argv)
const paths = program.args
const requirePaths = program.require ? program.require.split(':') : paths

if (program.predictableIds) {
  supportCode.newId = IdGenerator.incrementing()
  supportCode.clock = new IncrementClock()
  supportCode.makeErrorMessage = withSourceFramesOnlyStackTrace()
}

const options: IGherkinOptions = {
  defaultDialect: 'en',
  newId: supportCode.newId,
  createReadStream: (path: string) =>
    fs.createReadStream(path, { encoding: 'utf-8' }),
}

async function loadSupportCode(): Promise<void> {
  const supportCodePaths = await findSupportCodePaths(requirePaths)
  let tsNodeRegistered = false
  for (const supportCodePath of supportCodePaths) {
    if (supportCodePath.endsWith('.ts') && !tsNodeRegistered) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const tsnode = require('ts-node')
      tsnode.register({
        transpileOnly: true,
      })
      tsNodeRegistered = true
    }
    require(supportCodePath)
  }
}

async function main() {
  if (program.globals) {
    for (const key of Object.keys(supportCode)) {
      // @ts-ignore
      global[key] = supportCode[key]
    }
  }
  await loadSupportCode()
  const cucumberStream = new CucumberStream(
    supportCode.parameterTypes,
    supportCode.stepDefinitions,
    supportCode.beforeHooks,
    supportCode.afterHooks,
    supportCode.newId,
    supportCode.clock,
    supportCode.makeErrorMessage
  )
  await pipelinePromise(
    gherkin.fromPaths(paths, options),
    cucumberStream,
    formatStream(program.format),
    process.stdout
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
