import gherkin from '../src'
import { IdGenerator, messages } from '@cucumber/messages'
import { pipeline, Readable, Writable } from 'stream'
import assert from 'assert'
import GherkinQuery from '../src/GherkinQuery'
import { promisify } from 'util'

const pipelinePromise = promisify(pipeline)

describe('GherkinQuery', () => {
  let gherkinQuery: GherkinQuery
  let envelopes: messages.IEnvelope[]
  beforeEach(() => {
    envelopes = []
    gherkinQuery = new GherkinQuery()
  })

  describe('#getLocation(astNodeId)', () => {
    it('looks up a scenario line number', async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
`
      )
      const pickle = envelopes.find(e => e.pickle).pickle
      const gherkinScenarioId = pickle.astNodeIds[0]
      const location = gherkinQuery.getLocation(gherkinScenarioId)
      assert.deepStrictEqual(location.line, 2)
    })

    it('looks up a step line number', async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
`
      )
      const pickleStep = envelopes.find(e => e.pickle).pickle.steps[0]
      const gherkinStepId = pickleStep.astNodeIds[0]
      const location = gherkinQuery.getLocation(gherkinStepId)
      assert.deepStrictEqual(location.line, 3)
    })
  })

  describe('#getPickleIds(uri, lineNumber)', () => {
    it('looks up pickle IDs for a scenario', async () => {
      await parse(
        `Feature: hello
  Background:
    Given a background step

  Scenario: hi
    Given a passed step
`
      )
      const pickleId = envelopes.find(e => e.pickle).pickle.id
      const pickleIds = gherkinQuery.getPickleIds('test.feature', 5)
      assert.deepStrictEqual(pickleIds, [pickleId])
    })

    it('looks up pickle IDs for a whole document', async () => {
      await parse(
        `Feature: hello
  Scenario:
    Given a failed step

  Scenario: hi
    Given a passed step
`
      )
      const expectedPickleIds = envelopes
        .filter(e => e.pickle)
        .map(e => e.pickle.id)
      const pickleIds = gherkinQuery.getPickleIds('test.feature')
      assert.deepStrictEqual(pickleIds, expectedPickleIds)
    })

    it('fails to look up pickle IDs for a step', async () => {
      await parse(
        `Feature: hello
  Background:
    Given a background step

  Scenario: hi
    Given a passed step
`
      )

      assert.throws(() => gherkinQuery.getPickleIds('test.feature', 6), {
        message: 'No values found for key 6. Keys: [5]',
      })
    })

    it('avoids dupes and ignores empty scenarios', async () => {
      await parse(
        `Feature: Examples and empty scenario

  Scenario: minimalistic
    Given the <what>

    Examples:
      | what |
      | foo  |

    Examples:
      | what |
      | bar  |

  Scenario: ha ok
`
      )

      const pickleIds = gherkinQuery.getPickleIds('test.feature')
      // One for each table, and one for the empty scenario
      // https://github.com/cucumber/cucumber/issues/249
      assert.strictEqual(pickleIds.length, 3, pickleIds.join(','))
    })
  })

  describe('#getPickleStepIds(uri, lineNumber)', () => {
    it('looks up pickle step IDs for a step', async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
`
      )
      const pickleStepId = envelopes.find(e => e.pickle).pickle.steps[0].id
      const pickleStepIds = gherkinQuery.getPickleStepIds('test.feature', 3)
      assert.deepStrictEqual(pickleStepIds, [pickleStepId])
    })

    it('fails to looks up pickle step IDs for a pickle', async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
`
      )
      assert.throws(() => gherkinQuery.getPickleStepIds('test.feature', 2), {
        message: 'No values found for key 2. Keys: [3]',
      })
    })
  })

  function parse(gherkinSource: string): Promise<void> {
    const writable = new Writable({
      objectMode: true,
      write(
        envelope: messages.IEnvelope,
        encoding: string,
        callback: (error?: Error | null) => void
      ): void {
        envelopes.push(envelope)
        try {
          gherkinQuery.update(envelope)
          callback()
        } catch (err) {
          callback(err)
        }
      },
    })
    return pipelinePromise(
      gherkinMessages(gherkinSource, 'test.feature'),
      writable
    )
  }

  function gherkinMessages(gherkinSource: string, uri: string): Readable {
    const source = messages.Envelope.fromObject({
      source: {
        uri,
        data: gherkinSource,
        mediaType: 'text/x.cucumber.gherkin+plain',
      },
    })

    const newId = IdGenerator.incrementing()
    return gherkin.fromSources([source], { newId })
  }
})
