import { PassThrough, pipeline, Readable, Writable } from 'stream'
import SingleObjectWritableStream from './stream/SingleObjectWritableStream'
import JSONTransformStream from './stream/JSONTransformStream'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import PredictableSupportCode from './PredictableSupportCode'
import { compile } from '@cucumber/gherkin'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import createMeta from '@cucumber/create-meta'
import * as messages from '@cucumber/messages'
import { Feature } from '@cucumber/messages'
import { MessageToNdjsonStream } from '@cucumber/message-streams'
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
  const singleObjectWritable = new SingleObjectWritableStream<readonly Feature[]>()
  await asyncPipeline(jsonReadable, new JSONTransformStream(), singleObjectWritable)

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

  const metaEnvelope: messages.Envelope = {
    meta: createMeta('@cucumber/json-to-messages', version, process.env),
  }
  gherkinEnvelopeStream.write(metaEnvelope)

  for (const gherkinDocument of gherkinDocuments) {
    const sourceEnvelope: messages.Envelope = {
      source: gherkinDocumentToSource(gherkinDocument),
    }
    gherkinEnvelopeStream.write(sourceEnvelope)
    const gherkinDocumentEnvelope: messages.Envelope = { gherkinDocument: gherkinDocument }
    gherkinEnvelopeStream.write(gherkinDocumentEnvelope)
    const pickles = compile(gherkinDocument, gherkinDocument.uri, supportCode.newId)
    for (const pickle of pickles) {
      const pickleEnvelope: messages.Envelope = { pickle }
      gherkinEnvelopeStream.write(pickleEnvelope)
    }
  }
  gherkinEnvelopeStream.end()
  ndjsonStream.pipe(messageWritable)

  await runCucumber(
    supportCode,
    gherkinEnvelopeStream,
    query,
    ndjsonStream,
    undefined,
    makePredictableTestPlan
  )
}
