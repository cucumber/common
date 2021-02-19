import { Command } from 'commander'
import packageJson from '../package.json'
import loadSupportCode from './loadSupportCode'
import runCucumber from './runCucumber'
import { IGherkinOptions } from '@cucumber/gherkin'
import GherkinStreams from '@cucumber/gherkin/dist/src/stream/GherkinStreams'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import makeFormatStream from './makeFormatStream'
import { version } from '../package.json'
import { messages } from '@cucumber/messages'
import createMeta from '@cucumber/create-meta'

const program = new Command()
program.version(packageJson.version)
program.option('-r, --require <path>', 'override require path')
program.option('--predictable-ids', 'Use predictable ids', false)
program.option(
  '-f, --format <format>',
  'output format: ndjson|protobuf',
  'protobuf'
)

async function main() {
  program.parse(process.argv)
  const { predictableIds, format, require } = program.opts()

  const paths = program.args
  const requirePaths = require ? require.split(':') : paths

  const supportCode = await loadSupportCode(predictableIds, requirePaths)

  const gherkinOptions: IGherkinOptions = {
    defaultDialect: 'en',
    newId: supportCode.newId,
  }
  const gherkinEnvelopeStream = GherkinStreams.fromPaths(paths, gherkinOptions)

  const envelopeOutputStream = makeFormatStream(format)
  envelopeOutputStream.pipe(process.stdout)

  envelopeOutputStream.write(
    new messages.Envelope({
      meta: createMeta('fake-cucumber', version, process.env),
    })
  )

  const gherkinQuery = new GherkinQuery()

  await runCucumber(
    supportCode,
    gherkinEnvelopeStream,
    gherkinQuery,
    envelopeOutputStream
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
