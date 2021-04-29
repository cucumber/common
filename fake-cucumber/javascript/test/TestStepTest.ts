import assert from 'assert'
import * as messages from '@cucumber/messages'
import makePickleTestStep from '../src/makePickleTestStep'
import TestWorld from './TestWorld'
import IncrementClock from '../src/IncrementClock'
import { withSourceFramesOnlyStackTrace, withFullStackTrace, IWorld } from '../src'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import {
  CucumberExpression,
  ParameterTypeRegistry,
  RegularExpression,
} from '@cucumber/cucumber-expressions'
import IncrementStopwatch from '../src/IncrementStopwatch'
import { ITestStep } from '../src/types'

describe('TestStep', () => {
  let world: IWorld
  beforeEach(() => (world = new TestWorld()))

  async function execute(testStep: ITestStep): Promise<messages.TestStepFinished> {
    const receivedMessages: messages.Envelope[] = []
    await testStep.execute(world, 'some-testCaseStartedId', (message) =>
      receivedMessages.push(message)
    )
    return receivedMessages.pop().testStepFinished
  }

  describe('#execute', () => {
    it('returns a TestStepFinished with status UNDEFINED when there are no matching step definitions', async () => {
      const testStep = makePickleTestStep(
        'some-test-step-id',
        {
          text: 'an undefined step',
          astNodeIds: [],
          id: '1',
        },
        [],
        ['some.feature:123'],
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace()
      )

      const testStepFinished = await execute(testStep)

      assert.strictEqual(testStepFinished.testStepResult.status, 'UNDEFINED')
      assert.notStrictEqual(testStepFinished.testStepResult.duration, null)

      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('returns a TestStepFinished with status AMBIGUOUS when there are multiple matching step definitions', async () => {
      const stepDefinition = new ExpressionStepDefinition(
        'an-id',
        new CucumberExpression('an ambiguous step', new ParameterTypeRegistry()),
        null,
        () => {
          throw new Error('Should now be run')
        }
      )
      const testStep = makePickleTestStep(
        'some-test-step-id',
        {
          text: 'an ambiguous step',
          astNodeIds: [],
          id: '1',
        },
        [stepDefinition, stepDefinition],
        ['some.feature:123'],
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace()
      )

      const testStepFinished = await execute(testStep)
      assert.strictEqual(testStepFinished.testStepResult.status, 'AMBIGUOUS')
      assert.notStrictEqual(testStepFinished.testStepResult.duration, null)

      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('returns a TestStepResult object with the status', async () => {
      const testStep = makePickleTestStep(
        'some-test-step-id',
        {
          text: 'an undefined step',
          astNodeIds: [],
          id: '1',
        },
        [],
        ['some.feature:123'],
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace()
      )

      const result = await testStep.execute(world, 'some-testCaseStartedId', () => null)
      assert.strictEqual(result.status, 'UNDEFINED')
    })

    it('computes the execution duration', async () => {
      const emitted: messages.Envelope[] = []
      const testStep = makePickleTestStep(
        'some-test-step-id',
        {
          text: 'a passed step',
          astNodeIds: [],
          id: '1',
        },
        [
          new ExpressionStepDefinition(
            'an-id',
            new CucumberExpression('a passed step', new ParameterTypeRegistry()),
            null,
            () => null
          ),
        ],
        ['some.feature:123'],
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace()
      )
      await testStep.execute(world, 'some-id', (message) => emitted.push(message))
      const result = emitted.find((m) => m.testStepFinished).testStepFinished.testStepResult

      assert.strictEqual(result.duration.seconds, 0)
    })

    context('when there is a matching step definition', () => {
      it('returns a TestStepFinished with status PASSED when no exception is raised', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a passed step',
            astNodeIds: [],
            id: '1',
          },
          [
            new ExpressionStepDefinition(
              'an-id',
              new CucumberExpression('a passed step', new ParameterTypeRegistry()),
              null,
              () => null
            ),
          ],
          ['some.feature:123'],
          new IncrementClock(),
          new IncrementStopwatch(),
          withSourceFramesOnlyStackTrace()
        )

        const testStepFinished = await execute(testStep)

        assert.strictEqual(testStepFinished.testStepResult.status, 'PASSED')
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('returns a TestStepFinished with status PENDING when the string "pending" is returned', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a pending step',
            astNodeIds: [],
            id: '1',
          },
          [
            new ExpressionStepDefinition(
              'an-id',
              new CucumberExpression('a pending step', new ParameterTypeRegistry()),
              null,
              () => 'pending'
            ),
          ],
          ['some.feature:123'],
          new IncrementClock(),
          new IncrementStopwatch(),
          withSourceFramesOnlyStackTrace()
        )
        const testStepFinished = await execute(testStep)

        assert.strictEqual(testStepFinished.testStepResult.status, 'PENDING')
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('returns a TestStepFinished with status FAILED when an exception is raised', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a failed step',
            astNodeIds: [],
            id: '1',
          },
          [
            new ExpressionStepDefinition(
              'an-id',
              new CucumberExpression('a failed step', new ParameterTypeRegistry()),
              null,
              () => {
                throw new Error('This step has failed')
              }
            ),
          ],
          ['some.feature:123'],
          new IncrementClock(),
          new IncrementStopwatch(),
          withSourceFramesOnlyStackTrace()
        )

        const testStepFinished = await execute(testStep)
        assert.strictEqual(testStepFinished.testStepResult.status, 'FAILED')
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('adds the exception stack trace to the result', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a failed step',
            astNodeIds: [],
            id: '1',
          },
          [
            new ExpressionStepDefinition(
              'an-id',
              new CucumberExpression('a failed step', new ParameterTypeRegistry()),
              null,
              () => {
                throw new Error('Something went wrong')
              }
            ),
          ],
          ['some.feature:123'],
          new IncrementClock(),
          new IncrementStopwatch(),
          withFullStackTrace()
        )

        const testStepFinished = await execute(testStep)
        assert.ok(testStepFinished.testStepResult.message.includes('Something went wrong'))
        assert.ok(testStepFinished.testStepResult.message.includes('at some.feature:123'))
      })

      it('returns a TestStepFinished with error message from docstring', async () => {
        const docString: messages.PickleDocString = {
          content: 'hello',
        }
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a passed step',
            argument: {
              docString,
            },
            astNodeIds: [],
            id: '1',
          },
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
          new IncrementStopwatch(),
          withSourceFramesOnlyStackTrace()
        )

        const testStepFinished = await execute(testStep)
        assert.ok(testStepFinished.testStepResult.message.includes('error from hello'))
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })
    })
  })

  describe('#skip', () => {
    let testStep: ITestStep
    let receivedMessages: messages.Envelope[]

    beforeEach(() => {
      testStep = makePickleTestStep(
        'some-test-step-id',
        {
          text: 'an undefined step',
          astNodeIds: [],
          id: '1',
        },
        [],
        ['some.feature:123'],
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace()
      )

      receivedMessages = []
    })

    it('emits a TestStepStarted message', () => {
      testStep.skip((envelope) => receivedMessages.push(envelope), 'test-case-started-id')

      const testStepStarted = receivedMessages.find((m) => m.testStepStarted).testStepStarted
      assert.strictEqual(testStepStarted.testStepId, testStep.id)
    })

    it('emits a TestStepFinished message with a duration of 0', () => {
      testStep.skip((envelope) => receivedMessages.push(envelope), 'test-case-started-id')

      const testStepFinished = receivedMessages.find((m) => m.testStepFinished).testStepFinished
      assert.strictEqual(testStepFinished.testStepResult.duration.seconds, 0)
      assert.strictEqual(testStepFinished.testStepResult.duration.nanos, 0)
    })

    it('emits a TestStepFinished message with a result SKIPPED', () => {
      testStep.skip((envelope) => receivedMessages.push(envelope), 'test-case-started-id')

      const testStepFinished = receivedMessages.find((m) => m.testStepFinished).testStepFinished
      assert.strictEqual(testStepFinished.testStepResult.status, 'SKIPPED')
    })
  })
})
