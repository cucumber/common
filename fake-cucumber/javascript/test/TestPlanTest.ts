import {
  gherkinMessages,
  streamToArray,
  stubMatchingStepDefinition,
} from './TestHelpers'
import { messages } from 'cucumber-messages'
import { MessageNotifier } from '../src/types'
import assert from 'assert'
import TestPlan from '../src/TestPlan'
import { CucumberSupportCode } from '../src/support-code'

describe('TestPlan', () => {
  it('executes test cases', async () => {
    const stepDefinition = stubMatchingStepDefinition()

    const gherkinMessageList = await streamToArray(
      gherkinMessages(
        `Feature: test
  Scenario: test
    Given a passed step
`,
        'test.feature'
      )
    )

    const pickles = gherkinMessageList.filter(m => m.pickle).map(m => m.pickle)
    const supportCode = new CucumberSupportCode()
    const testPlan = new TestPlan(pickles, supportCode)
    const messageList: messages.IEnvelope[] = []
    const notifier: MessageNotifier = message => messageList.push(message)
    testPlan.execute(notifier)
    assert.deepStrictEqual(messageList.length, 5)
  })
})
