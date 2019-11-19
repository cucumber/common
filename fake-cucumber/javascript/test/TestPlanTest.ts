import {
  gherkinMessages,
  streamToArray,
  stubMatchingStepDefinition,
} from './TestHelpers'
import createTestPlan from '../src/createTestPlan'
import { messages } from 'cucumber-messages'
import { MessageNotifier } from '../src/types'
import assert from 'assert'

describe('TestPlan', () => {
  it('is built from pickles and step definitions', async () => {
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
    const testPlan = createTestPlan(pickles, [stepDefinition])
    const messageList: messages.IEnvelope[] = []
    const notifier: MessageNotifier = message => messageList.push(message)
    testPlan.execute(notifier)
    assert.deepStrictEqual(messageList.length, 4)
  })
})
