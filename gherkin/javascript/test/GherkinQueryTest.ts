import gherkin from '../src'
import { IdGenerator, messages } from 'cucumber-messages'
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
    it('looks up a line number', async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
`
      )
      const pickleStep = envelopes.find(e => e.pickle).pickle.steps[0]
      const location = gherkinQuery.getLocation(pickleStep.astNodeIds[0])
      assert.deepStrictEqual(location.line, 3)
    })
  })

  describe('#getPickleIds(uri, lineNumber)', () => {
    it('looks up pickle IDs for a step', async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
`
      )
      const pickleStepId = envelopes.find(e => e.pickle).pickle.steps[0].id
      const pickleStepIds = gherkinQuery.getPickleIds('test.feature', 3)
      assert.deepStrictEqual(pickleStepIds, [pickleStepId])
    })

    it('looks up pickle IDs for a scenario', async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
`
      )
      const pickleId = envelopes.find(e => e.pickle).pickle.id
      const pickleIds = gherkinQuery.getPickleIds('test.feature', 2)
      assert.deepStrictEqual(pickleIds, [pickleId])
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

    const newId = IdGenerator.uuid()
    return gherkin.fromSources([source], { newId })
  }
})
