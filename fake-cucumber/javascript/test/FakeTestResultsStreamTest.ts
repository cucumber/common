import * as gherkin from 'gherkin'
import { messages } from 'cucumber-messages'
import FakeTestResultsStream from '../src/FakeTestResultsStream'
import { Readable } from 'stream'
import * as assert from 'assert'
import Source = messages.Source
import Media = messages.Media

describe('FakeTestResultsStream', () => {
  it('generates failed pickle result', async () => {
    const gherkinSource = `Feature: mixed results

Scenario: passed then failed
  Given a passed step
  And a failed step
  And a skipped step
`
    const testCaseFinished = await getTestCaseFinished(gherkinSource, 'pattern')

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
    const testCaseFinished = await getTestCaseFinished(gherkinSource, 'pattern')

    assert.strictEqual(
      testCaseFinished.testResult.status,
      messages.TestResult.Status.PENDING
    )
  })

  it('generates no pickle result when results=none', async () => {
    const gherkinSource = `Feature: mixed results

Scenario: passed then failed
  Given a passed step
  And a pending step
  And a skipped step
`
    const envelopes = await generateMessages(gherkinSource, 'none')

    assert.strictEqual(
      undefined,
      envelopes.find(envelope => envelope.testCaseFinished)
    )

    assert.strictEqual(
      undefined,
      envelopes.find(envelope => envelope.testStepFinished)
    )
  })

  it('generates a match with argument for every second word', async () => {
    const gherkinSource = `Feature: mixed results

Scenario: some matches
  Given one two three four five six
`
    const allTestCaseMatched = await getAllTestStepMatched(
      gherkinSource,
      'pattern'
    )

    assert.strictEqual(allTestCaseMatched[0].stepMatchArguments.length, 3)

    assert.strictEqual(
      allTestCaseMatched[0].stepMatchArguments[0].group.value,
      'two'
    )
    assert.strictEqual(
      allTestCaseMatched[0].stepMatchArguments[0].group.start,
      4
    )

    assert.strictEqual(
      allTestCaseMatched[0].stepMatchArguments[1].group.value,
      'four'
    )
    assert.strictEqual(
      allTestCaseMatched[0].stepMatchArguments[1].group.start,
      14
    )

    assert.strictEqual(
      allTestCaseMatched[0].stepMatchArguments[2].group.value,
      'six'
    )
    assert.strictEqual(
      allTestCaseMatched[0].stepMatchArguments[2].group.start,
      24
    )
  })
})

async function generateMessages(
  gherkinSource: string,
  results: 'none' | 'pattern' | 'random'
): Promise<messages.IEnvelope[]> {
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
    .pipe(new FakeTestResultsStream('protobuf-objects', results))
  return streamToArray(fakeTestResultsStream)
}

async function getTestCaseFinished(
  gherkinSource: string,
  results: 'none' | 'pattern' | 'random'
): Promise<messages.ITestCaseFinished> {
  const envelopes = await generateMessages(gherkinSource, results)
  return envelopes.find(envelope => envelope.testCaseFinished).testCaseFinished
}

async function getAllTestStepMatched(
  gherkinSource: string,
  results: 'none' | 'pattern' | 'random'
): Promise<messages.ITestStepMatched[]> {
  const envelopes = await generateMessages(gherkinSource, results)
  return envelopes
    .filter(envelope => envelope.testStepMatched)
    .map(envelope => envelope.testStepMatched)
}

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
