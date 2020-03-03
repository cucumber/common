import assert from 'assert'
import { messages } from '@cucumber/messages'
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
import {
  withSourceFramesOnlyStackTrace,
  withFullStackTrace,
} from '../src/ErrorMessageGenerator'

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
        new IncrementClock(),
        withSourceFramesOnlyStackTrace()
      )

      const testStepFinished = await execute(testStep)

      assert.strictEqual(
        testStepFinished.testStepResult.status,
        messages.TestStepResult.Status.UNDEFINED
      )
      assert.notEqual(testStepFinished.testStepResult.duration, null)

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
        new IncrementClock(),
        withSourceFramesOnlyStackTrace()
      )

      const testStepFinished = await execute(testStep)
      assert.strictEqual(
        testStepFinished.testStepResult.status,
        messages.TestStepResult.Status.AMBIGUOUS
      )
      assert.notEqual(testStepFinished.testStepResult.duration, null)

      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('returns a TestStepResult object with the status', async () => {
      const testStep = makePickleTestStep(
        'some-test-step-id',
        messages.Pickle.PickleStep.create({
          text: 'an undefined step',
        }),
        [],
        ['some.feature:123'],
        new IncrementClock(),
        withSourceFramesOnlyStackTrace()
      )

      const result = await testStep.execute(
        world,
        () => null,
        'some-testCaseStartedId'
      )
      assert.strictEqual(
        result.status,
        messages.TestStepResult.Status.UNDEFINED
      )
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
        new IncrementClock(),
        withSourceFramesOnlyStackTrace()
      )
      await testStep.execute(world, message => emitted.push(message), 'some-id')
      const result = emitted.find(m => m.testStepFinished).testStepFinished
        .testStepResult

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
          new IncrementClock(),
          withSourceFramesOnlyStackTrace()
        )

        const testStepFinished = await execute(testStep)

        assert.strictEqual(
          testStepFinished.testStepResult.status,
          messages.TestStepResult.Status.PASSED
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
          new IncrementClock(),
          withSourceFramesOnlyStackTrace()
        )
        const testStepFinished = await execute(testStep)

        assert.strictEqual(
          testStepFinished.testStepResult.status,
          messages.TestStepResult.Status.PENDING
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
          new IncrementClock(),
          withSourceFramesOnlyStackTrace()
        )

        const testStepFinished = await execute(testStep)
        assert.strictEqual(
          testStepFinished.testStepResult.status,
          messages.TestStepResult.Status.FAILED
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
          new IncrementClock(),
          withFullStackTrace()
        )

        const testStepFinished = await execute(testStep)
        assert.ok(
          testStepFinished.testStepResult.message.includes(
            'Something went wrong'
          )
        )
        assert.ok(
          testStepFinished.testStepResult.message.includes(
            'at some.feature:123'
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
          new IncrementClock(),
          withSourceFramesOnlyStackTrace()
        )

        const testStepFinished = await execute(testStep)
        assert.ok(
          testStepFinished.testStepResult.message.includes('error from hello')
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })
    })
  })

  describe('#skip', () => {
    let testStep: ITestStep
    let receivedMessages: messages.IEnvelope[]

    beforeEach(() => {
      testStep = makePickleTestStep(
        'some-test-step-id',
        messages.Pickle.PickleStep.create({
          text: 'an undefined step',
        }),
        [],
        ['some.feature:123'],
        new IncrementClock(),
        withSourceFramesOnlyStackTrace()
      )

      receivedMessages = []
    })

    it('emits a TestStepStarted message', () => {
      testStep.skip(
        message => receivedMessages.push(message),
        'test-case-started-id'
      )

      const testStepStarted = receivedMessages.find(m => m.testStepStarted)
        .testStepStarted
      assert.strictEqual(testStepStarted.testStepId, testStep.id)
    })

    it('emits a TestStepFinished message with a duration of 0', () => {
      testStep.skip(
        message => receivedMessages.push(message),
        'test-case-started-id'
      )

      const testStepFinished = receivedMessages.find(m => m.testStepFinished)
        .testStepFinished
      assert.strictEqual(testStepFinished.testStepResult.duration.seconds, 0)
      assert.strictEqual(testStepFinished.testStepResult.duration.nanos, 0)
    })

    it('emits a TestStepFinished message with a result SKIPPED', () => {
      testStep.skip(
        message => receivedMessages.push(message),
        'test-case-started-id'
      )

      const testStepFinished = receivedMessages.find(m => m.testStepFinished)
        .testStepFinished
      assert.strictEqual(
        testStepFinished.testStepResult.status,
        messages.TestStepResult.Status.SKIPPED
      )
    })
  })
})
