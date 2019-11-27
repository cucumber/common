import { MessageNotifier } from '../src/types'
import { messages } from 'cucumber-messages'
import {
  gherkinMessages,
  streamToArray,
  stubMatchingStepDefinition,
} from './TestHelpers'
import Cucumber from '../src/Cucumber'
import assert from 'assert'
import { makeDummyStepDefinitions, makeDummyHooks } from '../src'

describe('Cucumber', () => {
  it('runs tagged hooks', async () => {
    const feature = `Feature: hooks

  @before-passed
  Scenario: test
    Given a passed step
  `

    const gherkinMessageList = await streamToArray(
      gherkinMessages(feature, 'test.feature')
    )
    const cucumber = new Cucumber(
      gherkinMessageList,
      makeDummyStepDefinitions(),
      makeDummyHooks()
    )
    const messageList: messages.IEnvelope[] = []
    const notifier: MessageNotifier = message => messageList.push(message)
    cucumber.execute(notifier)

    const testCase = messageList.find(m => m.testCase).testCase
    assert.strictEqual(testCase.testSteps.length, 2)
  })
})
