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

  it('generates default step definitions', async () => {
    const gherkinSource = `Feature: mixed results

Scenario: some matches
  Given one two three four five six
`

    const envelopes = await generateMessages(gherkinSource, 'none')
    const stepDefinitions = envelopes
      .filter(envelope => envelope.stepDefinitionConfig)
      .map(envelope => envelope.stepDefinitionConfig)

    assert.equal(stepDefinitions.length, 7, "There are 6 default step definitions")

    assert.equal(stepDefinitions[0].pattern.source, '{}passed{}',
      "The first matches passed steps")
    assert.equal(stepDefinitions[1].pattern.source, '{}failed{}',
      "The second matches failed steps")
    assert.equal(stepDefinitions[2].pattern.source, '{}pending{}',
      "The third matches pending steps")
    assert.equal(stepDefinitions[3].pattern.source, '{}skipped{}',
      "The fourth matches skipped steps")
    assert.equal(stepDefinitions[4].pattern.source, '{}ambig{}',
      "The fifth matches ambiguous steps")
    assert.equal(stepDefinitions[5].pattern.source, '{}ambiguous{}',
      "The sixth matches ambiguous steps too")

    assert.equal(stepDefinitions[6].pattern.source, 'I have {int} cukes in my belly',
      "The last matches a step with a typed parameter")

  })

  it('uses the step definitions to generate the arguments', async () => {
    const gherkinSource = `Feature: mixed results

Scenario: some matches
  When there is a failed step
  Then there should be a skipped step after
`
    const testCases = await getTestCases(gherkinSource, 'pattern')
    const firstStepMatchArguments = testCases[0].testSteps[0].stepMatchArguments
    const secondStepMatchArguments = testCases[0].testSteps[1].stepMatchArguments

    assert.strictEqual(firstStepMatchArguments.length, 2)

    assert.strictEqual(firstStepMatchArguments[0].group.value, 'there is a ')
    assert.strictEqual(firstStepMatchArguments[0].group.start, 0)

    assert.strictEqual(firstStepMatchArguments[1].group.value, ' step')
    assert.strictEqual(firstStepMatchArguments[1].group.start, 17)

    assert.strictEqual(secondStepMatchArguments.length, 2)

    assert.strictEqual(secondStepMatchArguments[0].group.value, 'there should be a ')
    assert.strictEqual(secondStepMatchArguments[0].group.start, 0)

    assert.strictEqual(secondStepMatchArguments[1].group.value, ' step after')
    assert.strictEqual(secondStepMatchArguments[1].group.start, 25)
  })

  it('produces the correct type for the parameters', async () => {
    const gherkinSource = `Feature: mixed results

Scenario: some matches
  When I have 12 cukes in my belly
  Then a failed step
`
    const testCases = await getTestCases(gherkinSource, 'pattern')
    const firstStepMatchArguments = testCases[0].testSteps[0].stepMatchArguments
    const secondStepMatchArguments = testCases[0].testSteps[1].stepMatchArguments

    assert.strictEqual(firstStepMatchArguments.length, 1)
    assert.strictEqual(firstStepMatchArguments[0].parameterTypeName, 'int')

    assert.strictEqual(secondStepMatchArguments.length, 2)
    assert.strictEqual(secondStepMatchArguments[0].parameterTypeName, '')
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
