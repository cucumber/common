import { Query as GherkinQuery } from '@cucumber/gherkin'
import GherkinQueryStream from './GherkinQueryStream'
import makeTestPlan from './makeTestPlan'
import { Readable, Writable } from 'stream'
import SupportCode from './SupportCode'
import { MakeTestPlan } from './types'
import makeTestCase from './makeTestCase'

export default async function runCucumber(
  supportCode: SupportCode,
  gherkinEnvelopeStream: Readable,
  gherkinQuery: GherkinQuery,
  envelopeOutputStream: Writable,
  makeTestPlanFn: MakeTestPlan = makeTestPlan
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

  const testPlan = makeTestPlanFn(gherkinQuery, supportCode, makeTestCase)
  await testPlan.execute((envelope) => {
    envelopeOutputStream.write(envelope)
    if (envelope.testRunFinished) {
      envelopeOutputStream.end()
    }
  })
}
