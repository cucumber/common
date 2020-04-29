import { PassThrough, pipeline, Readable, Writable } from 'stream'
import SingleObjectWritableStream from './stream/SingleObjectWritableStream'
import { IFeature } from './cucumber-generic/JSONSchema'
import JSONTransformStream from './stream/JSONTransformStream'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import PredictableSupportCode from './PredictableSupportCode'
import { compile, Query as GherkinQuery } from '@cucumber/gherkin'
import {
  messages,
  MessageToNdjsonStream,
  version as messagesVersion,
} from '@cucumber/messages'
import AstMaker from './AstMaker'
import detectImplementation from './detectImplementation'
import traverseFeature from './JSONTraverse'
import makePredictableTestPlan from './test-generation/makePredictableTestPlan'
import { promisify } from 'util'
import { Implementation } from './types'
import gherkinDocumentToSource from '../test/gherkinDocumentToSource'
import { version } from '../package.json'

const asyncPipeline = promisify(pipeline)

/**
 * This function is the main entry point when this tool is used as a library
 * (for example in a Web application)
 *
 * @param jsonReadable - a Readable stream containing vintage Cucumber JSON
 * @param messageWritable - a Writable stream where messages will be written
 * @param implementation - an explicit implementation, such as "behave", "javascript" or "ruby"
 */
export default async function main(
  jsonReadable: Readable,
  messageWritable: Writable,
  implementation?: Implementation
) {
  const singleObjectWritable = new SingleObjectWritableStream<
    ReadonlyArray<IFeature>
  >()
  await asyncPipeline(
    jsonReadable,
    new JSONTransformStream(),
    singleObjectWritable
  )

  const supportCode = new SupportCode()
  const predictableSupportCode = new PredictableSupportCode(supportCode)
  const query = new GherkinQuery()
  const ndjsonStream = new MessageToNdjsonStream()
  const gherkinEnvelopeStream = new PassThrough({ objectMode: true })
  const astMaker = new AstMaker()

  const gherkinDocuments = singleObjectWritable.object.map((feature) =>
    traverseFeature(
      implementation || detectImplementation(feature),
      feature,
      astMaker,
      supportCode.newId,
      predictableSupportCode
    )
  )

  gherkinEnvelopeStream.write(
    messages.Envelope.create({
      meta: messages.Meta.create({
        protocolVersion: messagesVersion,
        implementation: messages.Meta.Product.create({
          name: '@cucumber/json-to-messages',
          version,
        }),
      }),
    })
  )

  for (const gherkinDocument of gherkinDocuments) {
    gherkinEnvelopeStream.write(
      messages.Envelope.create({
        source: gherkinDocumentToSource(gherkinDocument),
      })
    )
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
  gherkinEnvelopeStream.end()
  ndjsonStream.pipe(messageWritable)

  await runCucumber(
    supportCode,
    gherkinEnvelopeStream,
    query,
    ndjsonStream,
    makePredictableTestPlan
  )
}
