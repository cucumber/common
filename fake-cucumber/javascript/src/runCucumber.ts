import { Query as GherkinQuery } from '@cucumber/gherkin'
import GherkinQueryStream from './GherkinQueryStream'
import makeTestPlan from './makeTestPlan'
import { Readable, Writable } from 'stream'
import SupportCode from './SupportCode'

export default async function runCucumber(
  supportCode: SupportCode,
  gherkinEnvelopeStream: Readable,
  gherkinQuery: GherkinQuery,
  envelopeOutputStream: Writable
) {
  const gherkinQueryStream = new GherkinQueryStream(gherkinQuery)
  gherkinEnvelopeStream
    .pipe(gherkinQueryStream)
    .pipe(envelopeOutputStream, { end: false })

  await new Promise((resolve, reject) => {
    gherkinQueryStream.on('end', resolve)
    gherkinQueryStream.on('error', reject)
    gherkinEnvelopeStream.on('error', reject)
  })
  const testPlan = makeTestPlan(gherkinQuery, supportCode)
  await testPlan.execute((envelope) => {
    envelopeOutputStream.write(envelope)
    if (envelope.testRunFinished) {
      envelopeOutputStream.end()
    }
  })
}
