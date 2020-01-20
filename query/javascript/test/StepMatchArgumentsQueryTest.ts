import 'source-map-support/register'
import gherkin, { GherkinQuery } from '@cucumber/gherkin'
import { IdGenerator, messages } from '@cucumber/messages'
import { pipeline, Readable, Writable } from 'stream'
import assert from 'assert'
import SupportCode from '@cucumber/fake-cucumber/dist/src/SupportCode'
import CucumberStream from '@cucumber/fake-cucumber/dist/src/CucumberStream'
import { withFullStackTrace } from '@cucumber/fake-cucumber/dist/src/ErrorMessageGenerator'
import makeDummyStepDefinitions from '@cucumber/fake-cucumber/dist/test/makeDummyStepDefinitions'

import { promisify } from 'util'
import IncrementClock from '@cucumber/fake-cucumber/dist/src/IncrementClock'
import StepMatchArgumentsQuery from '../src/StepMatchArgumentsQuery'

const pipelinePromise = promisify(pipeline)

describe('StepMatchArgumentsQuery', () => {
  let gherkinQuery: GherkinQuery
  let stepMatchArgumentsQuery: StepMatchArgumentsQuery
  beforeEach(() => {
    gherkinQuery = new GherkinQuery()
    stepMatchArgumentsQuery = new StepMatchArgumentsQuery()
  })

  describe('#getStepMatchArguments(uri, lineNumber)', () => {
    it("looks up result for step's uri and line", async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
    And I have 567 cukes in my belly
`
      )

      assert.deepStrictEqual(
        stepMatchArgumentsQuery
          .getStepMatchArgumentsLists(
            gherkinQuery.getPickleStepIds('test.feature', 3)[0]
          )
          .map(sal => sal.stepMatchArguments.map(arg => arg.parameterTypeName)),
        [['word']]
      )

      assert.deepStrictEqual(
        stepMatchArgumentsQuery
          .getStepMatchArgumentsLists(
            gherkinQuery.getPickleStepIds('test.feature', 4)[0]
          )
          .map(sal => sal.stepMatchArguments.map(arg => arg.parameterTypeName)),
        [['int', 'word']]
      )
    })
  })

  function parse(gherkinSource: string): Promise<void> {
    const newId = IdGenerator.incrementing()
    const clock = new IncrementClock()
    const makeErrorMessage = withFullStackTrace()
    const supportCode = new SupportCode(newId, clock, makeErrorMessage)
    makeDummyStepDefinitions(supportCode)

    const cucumberStream = new CucumberStream(
      supportCode.parameterTypes,
      supportCode.stepDefinitions,
      supportCode.beforeHooks,
      supportCode.afterHooks,
      supportCode.newId,
      supportCode.clock,
      supportCode.makeErrorMessage
    )

    const queryUpdateStream = new Writable({
      objectMode: true,
      write(
        envelope: messages.IEnvelope,
        encoding: string,
        callback: (error?: Error | null) => void
      ): void {
        try {
          gherkinQuery.update(envelope)
          stepMatchArgumentsQuery.update(envelope)
          callback()
        } catch (err) {
          callback(err)
        }
      },
    })
    return pipelinePromise(
      gherkinMessages(gherkinSource, 'test.feature', newId),
      cucumberStream,
      queryUpdateStream
    )
  }

  function gherkinMessages(
    gherkinSource: string,
    uri: string,
    newId: IdGenerator.NewId
  ): Readable {
    const source = messages.Envelope.fromObject({
      source: {
        uri,
        data: gherkinSource,
        mediaType: 'text/x.cucumber.gherkin+plain',
      },
    })
    return gherkin.fromSources([source], { newId })
  }
})
