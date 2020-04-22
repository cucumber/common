import assert from 'assert'
import { messages } from '@cucumber/messages'
import ITestStep from '../src/ITestStep'
import makePickleTestStep from '../src/makePickleTestStep'
import IWorld from '../src/IWorld'
import TestWorld from './TestWorld'
import IncrementClock from '../src/IncrementClock'
import {
  withSourceFramesOnlyStackTrace,
  withFullStackTrace,
} from '../src/ErrorMessageGenerator'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import {
  CucumberExpression,
  ParameterTypeRegistry,
  RegularExpression,
} from '@cucumber/cucumber-expressions'

describe('TestStep', () => {
  let world: IWorld
  beforeEach(() => (world = new TestWorld()))

  async function execute(
    testStep: ITestStep
  ): Promise<messages.ITestStepFinished> {
    const receivedMessages: messages.IEnvelope[] = []
    await testStep.execute(world, 'some-testCaseStartedId', (message) =>
      receivedMessages.push(message)
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
        messages.TestStepFinished.TestStepResult.Status.UNDEFINED
      )
      assert.notEqual(testStepFinished.testStepResult.duration, null)

      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('emits a TestStepFinished with status AMBIGUOUS when there are multiple matching step definitions', async () => {
      const stepDefinition = new ExpressionStepDefinition(
        'an-id',
        new CucumberExpression(
          'an ambiguous step',
          new ParameterTypeRegistry()
        ),
        null,
        () => {
          throw new Error('Should now be run')
        }
      )
      const testStep = makePickleTestStep(
        'some-test-step-id',
        messages.Pickle.PickleStep.create({
          text: 'an ambiguous step',
        }),
        [stepDefinition, stepDefinition],
        ['some.feature:123'],
        new IncrementClock(),
        withSourceFramesOnlyStackTrace()
      )

      const testStepFinished = await execute(testStep)
      assert.strictEqual(
        testStepFinished.testStepResult.status,
        messages.TestStepFinished.TestStepResult.Status.AMBIGUOUS
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
        'some-testCaseStartedId',
        () => null
      )
      assert.strictEqual(
        result.status,
        messages.TestStepFinished.TestStepResult.Status.UNDEFINED
      )
    })

    it('computes the execution duration', async () => {
      const emitted: messages.IEnvelope[] = []
      const testStep = makePickleTestStep(
        'some-test-step-id',
        messages.Pickle.PickleStep.create({
          text: 'a passed step',
        }),
        [
          new ExpressionStepDefinition(
            'an-id',
            new CucumberExpression(
              'a passed step',
              new ParameterTypeRegistry()
            ),
            null,
            () => null
          ),
        ],
        ['some.feature:123'],
        new IncrementClock(),
        withSourceFramesOnlyStackTrace()
      )
      await testStep.execute(world, 'some-id', (message) =>
        emitted.push(message)
      )
      const result = emitted.find((m) => m.testStepFinished).testStepFinished
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
          [
            new ExpressionStepDefinition(
              'an-id',
              new CucumberExpression(
                'a passed step',
                new ParameterTypeRegistry()
              ),
              null,
              () => null
            ),
          ],
          ['some.feature:123'],
          new IncrementClock(),
          withSourceFramesOnlyStackTrace()
        )

        const testStepFinished = await execute(testStep)

        assert.strictEqual(
          testStepFinished.testStepResult.status,
          messages.TestStepFinished.TestStepResult.Status.PASSED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('emits a TestStepFinished with status PENDING when the string "pending" is returned', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          messages.Pickle.PickleStep.create({
            text: 'a pending step',
          }),
          [
            new ExpressionStepDefinition(
              'an-id',
              new CucumberExpression(
                'a pending step',
                new ParameterTypeRegistry()
              ),
              null,
              () => 'pending'
            ),
          ],
          ['some.feature:123'],
          new IncrementClock(),
          withSourceFramesOnlyStackTrace()
        )
        const testStepFinished = await execute(testStep)

        assert.strictEqual(
          testStepFinished.testStepResult.status,
          messages.TestStepFinished.TestStepResult.Status.PENDING
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('emits a TestStepFinished with status FAILED when an exception is raised', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          messages.Pickle.PickleStep.create({
            text: 'a failed step',
          }),
          [
            new ExpressionStepDefinition(
              'an-id',
              new CucumberExpression(
                'a failed step',
                new ParameterTypeRegistry()
              ),
              null,
              () => {
                throw new Error('This step has failed')
              }
            ),
          ],
          ['some.feature:123'],
          new IncrementClock(),
          withSourceFramesOnlyStackTrace()
        )

        const testStepFinished = await execute(testStep)
        assert.strictEqual(
          testStepFinished.testStepResult.status,
          messages.TestStepFinished.TestStepResult.Status.FAILED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('adds the exception stack trace to the result', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          messages.Pickle.PickleStep.create({
            text: 'a failed step',
          }),
          [
            new ExpressionStepDefinition(
              'an-id',
              new CucumberExpression(
                'a failed step',
                new ParameterTypeRegistry()
              ),
              null,
              () => {
                throw new Error('Something went wrong')
              }
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
            new ExpressionStepDefinition(
              'an-id',
              new RegularExpression(/.*/, new ParameterTypeRegistry()),
              null,
              (docStringArg: string) => {
                throw new Error(`error from ${docStringArg}`)
              }
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
        (message) => receivedMessages.push(message),
        'test-case-started-id'
      )

      const testStepStarted = receivedMessages.find((m) => m.testStepStarted)
        .testStepStarted
      assert.strictEqual(testStepStarted.testStepId, testStep.id)
    })

    it('emits a TestStepFinished message with a duration of 0', () => {
      testStep.skip(
        (message) => receivedMessages.push(message),
        'test-case-started-id'
      )

      const testStepFinished = receivedMessages.find((m) => m.testStepFinished)
        .testStepFinished
      assert.strictEqual(testStepFinished.testStepResult.duration.seconds, 0)
      assert.strictEqual(testStepFinished.testStepResult.duration.nanos, 0)
    })

    it('emits a TestStepFinished message with a result SKIPPED', () => {
      testStep.skip(
        (message) => receivedMessages.push(message),
        'test-case-started-id'
      )

      const testStepFinished = receivedMessages.find((m) => m.testStepFinished)
        .testStepFinished
      assert.strictEqual(
        testStepFinished.testStepResult.status,
        messages.TestStepFinished.TestStepResult.Status.SKIPPED
      )
    })
  })
})
