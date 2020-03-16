import { Command } from 'commander'
import packageJson from '../package.json'
import gherkin, {
  IGherkinOptions,
  Query as GherkinQuery,
} from '@cucumber/gherkin'
import formatStream from './formatStream'
import { IdGenerator } from '@cucumber/messages'
import findSupportCodePaths from './findSupportCodePaths'
import fs from 'fs'
import IncrementClock from './IncrementClock'
import {
  withFullStackTrace,
  withSourceFramesOnlyStackTrace,
} from './ErrorMessageGenerator'
import GherkinQueryStream from './GherkinQueryStream'
import PerfHooksClock from './PerfHooksClock'
import SupportCode from './SupportCode'
// eslint-disable-next-line @typescript-eslint/camelcase
import * as dsl from './dsl'
import makeTestPlan from './makeTestPlan'

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

async function main(options: {
  globals: boolean
  format: 'ndjson' | 'protobuf'
}) {
  if (options.globals) {
    for (const key of Object.keys(dsl)) {
      // @ts-ignore
      global[key] = supportCode[key]
    }
  }
  const format = formatStream(options.format)
  format.pipe(process.stdout)

  const supportCode = await loadSupportCode()
  const gherkinQuery = new GherkinQuery()

  const gherkinOptions: IGherkinOptions = {
    defaultDialect: 'en',
    newId: supportCode.newId,
    createReadStream: (path: string) =>
      fs.createReadStream(path, { encoding: 'utf-8' }),
  }

  const gherkinEnvelopeStream = gherkin.fromPaths(paths, gherkinOptions)
  const gherkinQueryStream = new GherkinQueryStream(gherkinQuery)
  gherkinEnvelopeStream.pipe(gherkinQueryStream).pipe(format, { end: false })

  await new Promise((resolve, reject) => {
    gherkinQueryStream.on('end', resolve)
    gherkinQueryStream.on('error', reject)
    gherkinEnvelopeStream.on('error', reject)
  })
  const testPlan = makeTestPlan(gherkinQuery, supportCode)
  await testPlan.execute(envelope => {
    format.write(envelope)
    if (envelope.testRunFinished) {
      format.end()
    }
  })
}

async function loadSupportCode(): Promise<SupportCode> {
  const supportCode = new SupportCode(
    IdGenerator.uuid(),
    new PerfHooksClock(),
    withFullStackTrace()
  )
  if (program.predictableIds) {
    supportCode.newId = IdGenerator.incrementing()
    supportCode.clock = new IncrementClock()
    supportCode.makeErrorMessage = withSourceFramesOnlyStackTrace()
  }

  dsl.setSupportCode(supportCode)
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
  return supportCode
}

main({ globals: program.globals, format: program.format }).catch(err => {
  console.error(err)
  process.exit(1)
})
