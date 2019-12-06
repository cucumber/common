import assert from 'assert'
import { messages } from 'cucumber-messages'
import ITestStep from '../src/ITestStep'
import {
  stubFailingSupportCodeExecutor,
  stubMatchingStepDefinition,
  stubPassingSupportCodeExecutor,
  stubPendingSupportCodeExecutor,
} from './TestHelpers'
import makePickleTestStep from '../src/makePickleTestStep'
import SupportCodeExecutor from '../src/SupportCodeExecutor'
import IWorld from '../src/IWorld'
import TestWorld from './TestWorld'

describe('TestStep', () => {
  let world: IWorld
  beforeEach(() => (world = new TestWorld()))

  function execute(testStep: ITestStep): messages.ITestStepFinished {
    const receivedMessages: messages.IEnvelope[] = []
    testStep.execute(
      world,
      message => receivedMessages.push(message),
      'some-testCaseStartedId'
    )
    return receivedMessages.pop().testStepFinished
  }

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
        testStep.execute(world, () => null, 'some-testCaseStartedId').status,
        messages.TestResult.Status.UNDEFINED
      )
    })

    it('computes the execution duration', () => {
      const emitted: messages.IEnvelope[] = []
      const testStep = makePickleTestStep(
        messages.Pickle.PickleStep.create({
          text: 'a passed step',
        }),
        [stubMatchingStepDefinition(stubPassingSupportCodeExecutor())]
      )
      testStep.execute(world, message => emitted.push(message), 'some-id')
      const result = emitted.find(m => m.testStepFinished).testStepFinished
        .testResult

      assert.strictEqual(result.duration.seconds, 0)
      assert.strictEqual(result.duration.nanos, 0)
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

      it('emits a TestStepFinished with error message from docstring', () => {
        const docString = new messages.PickleStepArgument.PickleDocString({
          content: 'hello',
        })
        const testStep = makePickleTestStep(
          messages.Pickle.PickleStep.create({
            text: 'a passed step',
            argument: new messages.PickleStepArgument({
              docString,
            }),
          }),
          [
            stubMatchingStepDefinition(
              new SupportCodeExecutor(
                'an-id',
                (docStringArg: string) => {
                  throw new Error(`error from ${docStringArg}`)
                },
                [],
                docString,
                null
              )
            ),
          ]
        )

        const testStepFinished = execute(testStep)
        assert.ok(
          testStepFinished.testResult.message.includes('error from hello')
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })
    })
  })
})
