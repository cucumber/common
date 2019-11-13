import gherkin from 'gherkin'
import { messages } from 'cucumber-messages'
import FakeTestResultsStream from '../src/FakeTestResultsStream'
import { Readable } from 'stream'
import * as assert from 'assert'

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
    const testCases = await getTestCases(gherkinSource, 'pattern')
    const stepMatchArguments = testCases[0].testSteps[0].stepMatchArguments

    assert.strictEqual(stepMatchArguments.length, 3)

    assert.strictEqual(stepMatchArguments[0].group.value, 'two')
    assert.strictEqual(stepMatchArguments[0].group.start, 4)

    assert.strictEqual(stepMatchArguments[1].group.value, 'four')
    assert.strictEqual(stepMatchArguments[1].group.start, 14)

    assert.strictEqual(stepMatchArguments[2].group.value, 'six')
    assert.strictEqual(stepMatchArguments[2].group.start, 24)
  })

  it('generates default step definitions', async () => {
    const gherkinSource = `Feature: mixed results

Scenario: some matches
  Given one two three four five six
`

    const envelopes = await generateMessages(gherkinSource, 'none')
    const stepDefinitions = envelopes
      .filter(envelope => envelope.stepDefinitionConfig)
      .map(envelope => envelope.stepDefinitionConfig)

    console.log(stepDefinitions)

    assert.equal(stepDefinitions.length, 6, "There are 6 default step definitions")

    assert.equal(stepDefinitions[0].pattern.source, '{}passed{}', "The first matches passed steps")
    assert.equal(stepDefinitions[1].pattern.source, '{}failed{}', "The first matches failed steps")
    assert.equal(stepDefinitions[2].pattern.source, '{}pending{}', "The first matches pending steps")
    assert.equal(stepDefinitions[3].pattern.source, '{}skipped{}', "The first matches skipped steps")
    assert.equal(stepDefinitions[4].pattern.source, '{}ambig{}', "The first matches ambiguous steps")
    assert.equal(stepDefinitions[5].pattern.source, '{}ambiguous{}', "The first matches ambiguous steps too")
  })
})

async function generateMessages(
  gherkinSource: string,
  results: 'none' | 'pattern' | 'random'
): Promise<messages.IEnvelope[]> {
  const source = messages.Envelope.fromObject({
    source: {
      uri: 'test.feature',
      data: gherkinSource,
      media: messages.Media.fromObject({
        encoding: 'UTF8',
        contentType: 'text/x.cucumber.gherkin+plain',
      }),
    },
  })

  const fakeTestResultsStream = gherkin
    .fromSources([source], { newId: gherkin.uuid() })
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

async function getTestCases(
  gherkinSource: string,
  results: 'none' | 'pattern' | 'random'
): Promise<messages.ITestCase[]> {
  const envelopes = await generateMessages(gherkinSource, results)
  return envelopes
    .filter(envelope => envelope.testCase)
    .map(envelope => envelope.testCase)
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
