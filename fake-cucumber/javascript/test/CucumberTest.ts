import { MessageNotifier } from '../src/types'
import { messages } from 'cucumber-messages'
import {
  gherkinMessages,
  streamToArray,
  stubMatchingStepDefinition,
} from './TestHelpers'
import Cucumber from '../src/Cucumber'
import assert from 'assert'

describe('Cucumber', () => {
  it('assembles the whole system', async () => {
    const feature = `Feature: test
  Scenario: test
    Given a passed step
  `
    const gherkinMessageList = await streamToArray(
      gherkinMessages(feature, 'test.feature')
    )
    const stepDefinitions = [stubMatchingStepDefinition()]
    const cucumber = new Cucumber(gherkinMessageList, stepDefinitions)
    const messageList: messages.IEnvelope[] = []
    const notifier: MessageNotifier = message => messageList.push(message)
    cucumber.execute(notifier)
    assert.strictEqual(messageList.length, 9)
  })
})
