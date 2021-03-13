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
    return receivedMessages.pop().test_step_finished
  }

  describe('#execute', () => {
    it('emits a TestStepFinished with status UNDEFINED when there are no matching step definitions', async () => {
      const testStep = makePickleTestStep(
        'some-test-step-id',
        {
          text: 'an undefined step',
        },
        [],
        ['some.feature:123'],
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace()
      )

      const testStepFinished = await execute(testStep)

      assert.strictEqual(testStepFinished.test_step_result.status, 'UNDEFINED')
      assert.notEqual(testStepFinished.test_step_result.duration, null)

      assert.strictEqual(testStepFinished.test_step_id, testStep.id)
    })

    it('emits a TestStepFinished with status AMBIGUOUS when there are multiple matching step definitions', async () => {
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
        },
        [stepDefinition, stepDefinition],
        ['some.feature:123'],
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace()
      )

      const testStepFinished = await execute(testStep)
      assert.strictEqual(testStepFinished.test_step_result.status, 'AMBIGUOUS')
      assert.notEqual(testStepFinished.test_step_result.duration, null)

      assert.strictEqual(testStepFinished.test_step_id, testStep.id)
    })

    it('returns a TestStepResult object with the status', async () => {
      const testStep = makePickleTestStep(
        'some-test-step-id',
        {
          text: 'an undefined step',
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
      const result = emitted.find((m) => m.test_step_finished).test_step_finished.test_step_result

      assert.strictEqual(result.duration.seconds, 0)
    })

    context('when there is a matching step definition', () => {
      it('emits a TestStepFinished with status PASSED when no exception is raised', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a passed step',
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

        assert.strictEqual(testStepFinished.test_step_result.status, 'PASSED')
        assert.strictEqual(testStepFinished.test_step_id, testStep.id)
      })

      it('emits a TestStepFinished with status PENDING when the string "pending" is returned', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a pending step',
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

        assert.strictEqual(testStepFinished.test_step_result.status, 'PENDING')
        assert.strictEqual(testStepFinished.test_step_id, testStep.id)
      })

      it('emits a TestStepFinished with status FAILED when an exception is raised', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a failed step',
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
        assert.strictEqual(testStepFinished.test_step_result.status, 'FAILED')
        assert.strictEqual(testStepFinished.test_step_id, testStep.id)
      })

      it('adds the exception stack trace to the result', async () => {
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a failed step',
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
        assert.ok(testStepFinished.test_step_result.message.includes('Something went wrong'))
        assert.ok(testStepFinished.test_step_result.message.includes('at some.feature:123'))
      })

      it('emits a TestStepFinished with error message from docstring', async () => {
        const docString: messages.PickleDocString = {
          content: 'hello',
        }
        const testStep = makePickleTestStep(
          'some-test-step-id',
          {
            text: 'a passed step',
            argument: {
              doc_string: docString,
            },
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
        assert.ok(testStepFinished.test_step_result.message.includes('error from hello'))
        assert.strictEqual(testStepFinished.test_step_id, testStep.id)
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
      testStep.skip((message) => receivedMessages.push(message), 'test-case-started-id')

      const testStepStarted = receivedMessages.find((m) => m.test_step_started).test_step_started
      assert.strictEqual(testStepStarted.test_step_id, testStep.id)
    })

    it('emits a TestStepFinished message with a duration of 0', () => {
      testStep.skip((message) => receivedMessages.push(message), 'test-case-started-id')

      const testStepFinished = receivedMessages.find((m) => m.test_step_finished).test_step_finished
      assert.strictEqual(testStepFinished.test_step_result.duration.seconds, 0)
      assert.strictEqual(testStepFinished.test_step_result.duration.nanos, 0)
    })

    it('emits a TestStepFinished message with a result SKIPPED', () => {
      testStep.skip((message) => receivedMessages.push(message), 'test-case-started-id')

      const testStepFinished = receivedMessages.find((m) => m.test_step_finished).test_step_finished
      assert.strictEqual(testStepFinished.test_step_result.status, 'SKIPPED')
    })
  })
})
