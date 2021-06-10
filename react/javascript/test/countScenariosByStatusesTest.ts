import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import * as messages from '@cucumber/messages'
import { SupportCode } from '@cucumber/fake-cucumber'
import runFeature from './runFeature'
import assert from 'assert'
import countScenariosByStatuses from '../src/countScenariosByStatuses'

describe('countScenariosByStatuses', () => {
  let gherkinQuery: GherkinQuery
  let cucumberQuery: CucumberQuery
  let supportCode: SupportCode

  beforeEach(() => {
    gherkinQuery = new GherkinQuery()
    cucumberQuery = new CucumberQuery()
    supportCode = new SupportCode()
    supportCode.defineStepDefinition(null, 'a passed step', () => null)
    supportCode.defineStepDefinition(null, 'a failed step', () => {
      throw new Error('Something bad happened here ...')
    })
  })

  it('counts the number of scenarios with a given status', async () => {
    const feature = `
Feature: statuses

  Scenario: passed
    Given a passed step

  Scenario: another passed
    Given a passed step

  Scenario: failed
    Given a failed step

  Scenario: undefined
    Given we have no clue how to handle this step
    `
    const envelopes = await runFeature(feature, gherkinQuery, supportCode)
    for (const envelope of envelopes) {
      cucumberQuery.update(envelope)
    }
    const gherkinDocuments = envelopes
      .filter((envelope) => envelope.gherkinDocument)
      .map((envelope) => envelope.gherkinDocument)

    const statuses = countScenariosByStatuses(gherkinDocuments, gherkinQuery, cucumberQuery)

    assert.strictEqual(statuses.get(messages.TestStepResultStatus.PASSED), 2)
    assert.strictEqual(statuses.get(messages.TestStepResultStatus.FAILED), 1)
    assert.strictEqual(statuses.get(messages.TestStepResultStatus.UNDEFINED), 1)
  })

  it('counts different statuses with example tables', async () => {
    const feature = `
Feature: statuses

  Scenario: with an example table
    Given a <status> step

    Examples:
    | status    |
    | passed    |
    | failed    |
    | undefined |

    `
    const envelopes = await runFeature(feature, gherkinQuery, supportCode)
    for (const envelope of envelopes) {
      cucumberQuery.update(envelope)
    }

    const gherkinDocuments = envelopes
      .filter((envelope) => envelope.gherkinDocument)
      .map((envelope) => envelope.gherkinDocument)

    const statuses = countScenariosByStatuses(gherkinDocuments, gherkinQuery, cucumberQuery)

    assert.strictEqual(statuses.get(messages.TestStepResultStatus.PASSED), 1)
    assert.strictEqual(statuses.get(messages.TestStepResultStatus.FAILED), 1)
    assert.strictEqual(statuses.get(messages.TestStepResultStatus.UNDEFINED), 1)
  })
})
