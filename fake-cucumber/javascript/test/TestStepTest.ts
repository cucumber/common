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
import IncrementClock from '../src/IncrementClock'

describe('TestStep', () => {
  let world: IWorld
  beforeEach(() => (world = new TestWorld()))

  async function execute(
    testStep: ITestStep
  ): Promise<messages.ITestStepFinished> {
    const receivedMessages: messages.IEnvelope[] = []
    await testStep.execute(
      world,
      message => receivedMessages.push(message),
      'some-testCaseStartedId'
    )
    return receivedMessages.pop().testStepFinished
  }

  describe('#execute', () => {
    it('emits a TestStepFinished with status UNDEFINED when there are no matching step definitions', async () => {
      const testStep = makePickleTestStep(
        'some-test-step-id',
        messages.Pickle.PickleStep.create({
          text: 'an undefined step',
        }),
        [],
        ['some.feature:123'],
        new IncrementClock()
      )

      const testStepFinished = await execute(testStep)

      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.UNDEFINED
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('emits a TestStepFinished with status AMBIGUOUS when there are multiple matching step definitions', async () => {
      const testStep = makePickleTestStep(
        'some-test-step-id',
        messages.Pickle.PickleStep.create({
          text: 'an undefined step',
        }),
        [stubMatchingStepDefinition(), stubMatchingStepDefinition()],
        ['some.feature:123'],
        new IncrementClock()
      )

      const testStepFinished = await execute(testStep)
      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.AMBIGUOUS
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('returns a TestResult object with the status', async () => {
      const testStep = makePickleTestStep(
        'some-test-step-id',
        messages.Pickle.PickleStep.create({
          text: 'an undefined step',
        }),
        [],
        ['some.feature:123'],
        new IncrementClock()
      )

      const result = await testStep.execute(
        world,
        () => null,
        'some-testCaseStartedId'
      )
      assert.strictEqual(result.status, messages.TestResult.Status.UNDEFINED)
    })

    it('computes the execution duration', async () => {
      const emitted: messages.IEnvelope[] = []
      const testStep = makePickleTestStep(
        'some-test-step-id',
        messages.Pickle.PickleStep.create({
          text: 'a passed step',
        }),
        [stubMatchingStepDefinition(stubPassingSupportCodeExecutor())],
        ['some.feature:123'],
        new IncrementClock()
      )
      await testStep.execute(world, message => emitted.push(message), 'some-id')
      const result = emitted.find(m => m.testStepFinished).testStepFinished
        .testResult

      assert.strictEqual(result.duration.seconds, 0)
    })

    context('when there is a matching step definition', () => {
      it('emits a TestStepFinished with status PASSED when no exception is raised', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          messages.Pickle.PickleStep.create({
            text: 'a passed step',
          }),
          [stubMatchingStepDefinition(stubPassingSupportCodeExecutor())],
          ['some.feature:123'],
          new IncrementClock()
        )

        const testStepFinished = await execute(testStep)

        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.PASSED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('emits a TestStepFinished with status PENDING when the string "pending" is returned', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          messages.Pickle.PickleStep.create({
            text: 'a passed step',
          }),
          [stubMatchingStepDefinition(stubPendingSupportCodeExecutor())],
          ['some.feature:123'],
          new IncrementClock()
        )
        const testStepFinished = await execute(testStep)

        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.PENDING
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('emits a TestStepFinished with status FAILED when an exception is raised', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          messages.Pickle.PickleStep.create({
            text: 'a passed step',
          }),
          [
            stubMatchingStepDefinition(
              stubFailingSupportCodeExecutor('This step has failed')
            ),
          ],
          ['some.feature:123'],
          new IncrementClock()
        )

        const testStepFinished = await execute(testStep)
        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.FAILED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('adds the exception stack trace to the result', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          messages.Pickle.PickleStep.create({
            text: 'a passed step',
          }),
          [
            stubMatchingStepDefinition(
              stubFailingSupportCodeExecutor('Something went wrong')
            ),
          ],
          ['some.feature:123'],
          new IncrementClock()
        )

        const testStepFinished = await execute(testStep)
        assert.ok(
          testStepFinished.testResult.message.includes('Something went wrong')
        )
        assert.ok(
          testStepFinished.testResult.message.includes(
            'at Object.stubFailingSupportCodeExecutor'
          )
        )
      })

      it('emits a TestStepFinished with error message from docstring', async () => {
        const docString = new messages.PickleStepArgument.PickleDocString({
          content: 'hello',
        })
        const testStep = makePickleTestStep(
          'some-test-step-id',
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
          ],
          ['some.feature:123'],
          new IncrementClock()
        )

        const testStepFinished = await execute(testStep)
        assert.ok(
          testStepFinished.testResult.message.includes('error from hello')
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })
    })
  })
})
