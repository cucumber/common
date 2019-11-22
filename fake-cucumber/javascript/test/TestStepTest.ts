import assert from 'assert'
import { messages } from 'cucumber-messages'
import TestStep from '../src/TestStep'
import {
  stubFailingSupportCodeExecutor,
  stubMatchingStepDefinition,
  stubPassingSupportCodeExecutor,
  stubPendingSupportCodeExecutor,
  MockDurationComputer,
} from './TestHelpers'
import makePickleTestStep from '../src/makePickleTestStep'
import SupportCodeExecutor from '../src/SupportCodeExecutor'
import DurationComputer from '../src/DurationComputer'

function execute(testStep: TestStep): messages.ITestStepFinished {
  const receivedMessages: messages.IEnvelope[] = []
  testStep.execute(
    message => receivedMessages.push(message),
    'some-testCaseStartedId'
  )
  return receivedMessages.pop().testStepFinished
}

describe('TestStep', () => {
  describe('#execute', () => {
    it('emits a TestStepFinished with status UNDEFINED when there are no matching step definitions', () => {
      const testStep = makePickleTestStep(
        messages.Pickle.PickleStep.create({
          text: 'an undefined step',
        }),
        []
      )

      const testStepFinished = execute(testStep)

      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.UNDEFINED
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('emits a TestStepFinished with status AMBIGUOUS when there are multiple matching step definitions', () => {
      const testStep = makePickleTestStep(
        messages.Pickle.PickleStep.create({
          text: 'an undefined step',
        }),
        [stubMatchingStepDefinition(), stubMatchingStepDefinition()]
      )

      const testStepFinished = execute(testStep)
      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.AMBIGUOUS
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('returns a TestResult object with the status', () => {
      const testStep = makePickleTestStep(
        messages.Pickle.PickleStep.create({
          text: 'an undefined step',
        }),
        []
      )

      assert.strictEqual(
        testStep.execute(message => null, 'some-testCaseStartedId').status,
        messages.TestResult.Status.UNDEFINED
      )
    })

    it('the execution duration is based on the data provided by DurationComputer', () => {
      const emitted: messages.IEnvelope[] = []
      const testStep = makePickleTestStep(
        messages.Pickle.PickleStep.create({
          text: 'a passed step',
        }),
        [stubMatchingStepDefinition(stubPassingSupportCodeExecutor())]
      )
      testStep.execute(
        message => emitted.push(message),
        'some-id',
        new MockDurationComputer(9876543210)
      )
      const result = emitted.find(m => m.testStepFinished).testStepFinished
        .testResult

      assert.strictEqual(result.duration.seconds, 9)
      assert.strictEqual(result.duration.nanos, 876543210)
    })

    context('when there is a matching step definition', () => {
      it('emits a TestStepFinished with status PASSED when no exception is raised', () => {
        const testStep = makePickleTestStep(
          messages.Pickle.PickleStep.create({
            text: 'a passed step',
          }),
          [stubMatchingStepDefinition(stubPassingSupportCodeExecutor())]
        )

        const testStepFinished = execute(testStep)

        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.PASSED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('emits a TestStepFinished with status PENDING when the string "pending" is returned', () => {
        const testStep = makePickleTestStep(
          messages.Pickle.PickleStep.create({
            text: 'a passed step',
          }),
          [stubMatchingStepDefinition(stubPendingSupportCodeExecutor())]
        )
        const testStepFinished = execute(testStep)

        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.PENDING
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('emits a TestStepFinished with status FAILED when an exception is raised', () => {
        const testStep = makePickleTestStep(
          messages.Pickle.PickleStep.create({
            text: 'a passed step',
          }),
          [
            stubMatchingStepDefinition(
              stubFailingSupportCodeExecutor('This step has failed')
            ),
          ]
        )

        const testStepFinished = execute(testStep)
        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.FAILED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('adds the exception stack trace to the result', () => {
        const testStep = makePickleTestStep(
          messages.Pickle.PickleStep.create({
            text: 'a passed step',
          }),
          [
            stubMatchingStepDefinition(
              stubFailingSupportCodeExecutor('Something went wrong')
            ),
          ]
        )

        const testStepFinished = execute(testStep)
        assert.ok(
          testStepFinished.testResult.message.includes('Something went wrong')
        )
        assert.ok(
          testStepFinished.testResult.message.includes(
            'at Object.stubFailingSupportCodeExecutor'
          )
        )
      })
    })
  })
})
