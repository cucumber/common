import { Command } from 'commander'
import packageJson from '../package.json'
import RubyJSONParser from './RubyJSONParser'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import {
  messages,
  MessageToNdjsonStream,
  IdGenerator,
} from '@cucumber/messages'

import { compile, Query as GherkinQuery } from '@cucumber/gherkin'

import { PassThrough, pipeline } from 'stream'
import { promisify } from 'util'
import JSONTransformStream from '../src/JSONTransformStream'
import SingleObjectWritable from './SingleObjectWritable'
const asyncPipeline = promisify(pipeline)

const program = new Command()
program.version(packageJson.version)
program.parse(process.argv)

async function main() {
  const singleObjectWritable = new SingleObjectWritable<
    ReadonlyArray<Record<string, any>>
  >()
  await asyncPipeline(
    process.stdin,
    new JSONTransformStream(),
    singleObjectWritable
  )
  const idGenerator = IdGenerator.uuid()
  const supportCode = new SupportCode()

  const parser = new RubyJSONParser(idGenerator, supportCode)
  const gherkinDocuments = parser.parse(singleObjectWritable.object)
  const gherkinEnvelopeStream = new PassThrough({ objectMode: true })
  for (const gherkinDocument of gherkinDocuments) {
    gherkinEnvelopeStream.write(messages.Envelope.create({ gherkinDocument }))
    const pickles = compile(gherkinDocument, gherkinDocument.uri, idGenerator)
    for (const pickle of pickles) {
      gherkinEnvelopeStream.write(messages.Envelope.create({ pickle }))
    }
  }
  const query = new GherkinQuery()
  const ndjsonStream = new MessageToNdjsonStream()
  ndjsonStream.pipe(process.stdout)
  await runCucumber(supportCode, gherkinEnvelopeStream, query, ndjsonStream)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
