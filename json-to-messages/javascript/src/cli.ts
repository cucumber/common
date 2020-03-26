import { Command } from 'commander'
import packageJson from '../package.json'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import { IFeature } from './RubyJSONSchema'
import { messages, MessageToNdjsonStream } from '@cucumber/messages'

import { compile, Query as GherkinQuery } from '@cucumber/gherkin'

import { PassThrough, pipeline } from 'stream'
import { promisify } from 'util'
import JSONTransformStream from '../src/JSONTransformStream'
import SingleObjectWritable from './SingleObjectWritable'
import AstMaker from './AstMaker'
import { traverseFeature } from './RubyJSONTraverse'
import PredictableSupportCode from './PredictableSupportCode'
const asyncPipeline = promisify(pipeline)

const program = new Command()
program.version(packageJson.version)
program.parse(process.argv)

async function main() {
  const singleObjectWritable = new SingleObjectWritable<
    ReadonlyArray<IFeature>
  >()
  await asyncPipeline(
    process.stdin,
    new JSONTransformStream(),
    singleObjectWritable
  )
  const supportCode = new SupportCode()
  const predictableSupportCode = new PredictableSupportCode(supportCode)

  const astMaker = new AstMaker(supportCode.newId)
  const gherkinDocuments = singleObjectWritable.object.map(feature =>
    traverseFeature(feature, astMaker, predictableSupportCode)
  )
  const gherkinEnvelopeStream = new PassThrough({ objectMode: true })
  for (const gherkinDocument of gherkinDocuments) {
    gherkinEnvelopeStream.write(messages.Envelope.create({ gherkinDocument }))
    const pickles = compile(
      gherkinDocument,
      gherkinDocument.uri,
      supportCode.newId
    )
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
