import * as gherkin from 'gherkin'
import { messages } from 'cucumber-messages'
import FakeTestResultsStream from '../src/FakeTestResultsStream'
import { Readable } from 'stream'
import * as assert from 'assert'
import Source = messages.Source
import Media = messages.Media

async function getTestCaseFinished(gherkinSource: string) {
  const source = Source.fromObject({
    uri: 'test.feature',
    data: gherkinSource,
    media: Media.fromObject({
      encoding: 'UTF8',
      contentType: 'text/x.cucumber.gherkin+plain',
    }),
  })

  const fakeTestResultsStream = gherkin
    .fromSources([source])
    .pipe(new FakeTestResultsStream('protobuf-objects'))
  const envelopes = await streamToArray(fakeTestResultsStream)

  return envelopes.find(envelope => envelope.testCaseFinished).testCaseFinished
}

describe('FakeTestResultsStream', () => {
  it('generates failed pickle result', async () => {
    const gherkinSource = `Feature: mixed results

Scenario: passed then failed
  Given a passed step
  And a failed step
  And a skipped step
`
    const testCaseFinished = await getTestCaseFinished(gherkinSource)

    assert.strictEqual(
      testCaseFinished.testResult.status,
      messages.TestResult.Status.FAILED
    )
  })

  it('generates pending pickle result', async () => {
    const gherkinSource = `Feature: mixed results

Scenario: passed then failed
  Given a passed step
  And a pending step
  And a skipped step
`
    const testCaseFinished = await getTestCaseFinished(gherkinSource)

    assert.strictEqual(
      testCaseFinished.testResult.status,
      messages.TestResult.Status.PENDING
    )
  })
})

async function streamToArray(
  readableStream: Readable
): Promise<messages.IEnvelope[]> {
  return new Promise<messages.IEnvelope[]>(
    (
      resolve: (wrappers: messages.IEnvelope[]) => void,
      reject: (err: Error) => void
    ) => {
      const items: messages.IEnvelope[] = []
      readableStream.on('data', items.push.bind(items))
      readableStream.on('error', (err: Error) => reject(err))
      readableStream.on('end', () => resolve(items))
    }
  )
}
