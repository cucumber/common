import { Command } from 'commander'
import packageJson from '../package.json'
import loadSupportCode from './loadSupportCode'
import runCucumber from './runCucumber'
import os from 'os'
import { GherkinStreams, IGherkinStreamOptions } from '@cucumber/gherkin-streams'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { version } from '../package.json'
import * as messages from '@cucumber/messages'
import detectCiEnvironment from '@cucumber/ci-environment'
import { MessageToNdjsonStream } from '@cucumber/message-streams'
import { RunOptions } from './types'

const program = new Command()
program.version(packageJson.version)
program.option('-r, --require <path>', 'override require path')
program.option('--retry <count>', 'allow up to <count> retries for scenarios that fail')
program.option('--predictable-ids', 'Use predictable ids', false)

async function main() {
  program.parse(process.argv)
  const { predictableIds, require, retry } = program.opts()

  const paths = program.args
  const requirePaths = require ? require.split(':') : paths

  const supportCode = await loadSupportCode(predictableIds, requirePaths)

  const runOptions: RunOptions = {
    allowedRetries: retry ? Number(retry) : 0,
  }

  const gherkinStreamOptions: IGherkinStreamOptions = {
    defaultDialect: 'en',
    newId: supportCode.newId,
    relativeTo: process.cwd(),
  }
  const gherkinEnvelopeStream = GherkinStreams.fromPaths(paths, gherkinStreamOptions)

  const envelopeOutputStream = new MessageToNdjsonStream()
  envelopeOutputStream.pipe(process.stdout)

  const metaEnvelope: messages.Envelope = {
    meta: {
      protocolVersion: messages.version,
      implementation: {
        version,
        name: 'fake-cucumber',
      },
      cpu: {
        name: os.arch(),
      },
      os: {
        name: os.platform(),
        version: os.release(),
      },
      runtime: {
        name: 'node.js',
        version: process.versions.node,
      },
      ci: detectCiEnvironment(process.env),
    },
  }
  envelopeOutputStream.write(metaEnvelope)

  const gherkinQuery = new GherkinQuery()

  await runCucumber(
    supportCode,
    gherkinEnvelopeStream,
    gherkinQuery,
    envelopeOutputStream,
    runOptions
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
