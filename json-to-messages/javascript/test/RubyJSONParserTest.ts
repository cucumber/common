/* eslint-disable @typescript-eslint/camelcase */

import assert from 'assert'
import RubyJSONParser from '../src/RubyJSONParser'
import { SupportCode } from '@cucumber/fake-cucumber'
import {
  PassedCodeExecutor,
  FailedCodeExecutor,
} from '../src/SupportCodeExecutor'
import { IdGenerator, messages } from '@cucumber/messages'

describe('RubyJSONParser', () => {
  let supportCode: SupportCode
  let parser: RubyJSONParser

  beforeEach(() => {
    supportCode = new SupportCode()
    const idGenerator = IdGenerator.uuid()
    parser = new RubyJSONParser(idGenerator, supportCode)
  })

  context('.parse', () => {
    const sources = [
      {
        name: 'Attachments',
        description: 'Attachments can be added to steps',
        uri: 'features/attachments/attachments.feature',
        line: 2,
        keyword: 'Funksjonalitet',
      },
      {
        name: 'Another feature',
        description: '',
        uri: 'features/another/another.feature',
      },
    ]

    it('returns an empty list when sources are empty', () => {
      assert.deepStrictEqual(parser.parse([]), [])
    })

    it('produces a list of GherkinDocument with the correct URIs', () => {
      const documents = parser.parse(sources)
      assert.deepStrictEqual(
        documents.map(d => d.uri),
        [
          'features/attachments/attachments.feature',
          'features/another/another.feature',
        ]
      )
    })

    it('adds the correct keyword for the Feature', () => {
      const feature = parser.parse(sources)[0].feature

      assert.strictEqual(feature.keyword, 'Funksjonalitet')
    })

    it('creates a Feature for each document', () => {
      const documents = parser.parse(sources)

      assert.deepStrictEqual(
        documents.map(d => d.feature.name),
        ['Attachments', 'Another feature']
      )

      assert.deepStrictEqual(
        documents.map(d => d.feature.description),
        ['Attachments can be added to steps', '']
      )
    })

    it('creates locations for the features', () => {
      const documents = parser.parse(sources)
      const feature = documents[0].feature

      assert.strictEqual(feature.location.line, 2)
    })

    context('with backgrounds', () => {
      const singleBackground = [
        {
          name: 'Attachments',
          description: 'Attachments can be added to steps',
          uri: 'features/attachments/attachments.feature',
          elements: [
            {
              type: 'background',
              keyword: 'Background',
              name: 'Set up',
              description: "Let's do things",
              line: 5,
              steps: [
                {
                  keyword: 'Given ',
                  name: 'things',
                  line: 7,
                },
                {
                  keyword: 'And ',
                  name: 'stuff',
                },
              ],
            },
          ],
        },
      ]

      const multiBackground = [
        {
          name: 'Multi background',
          elements: [
            {
              type: 'background',
              name: 'First background',
            },
            {
              type: 'background',
              name: 'Second background',
            },
          ],
        },
      ]

      it('adds the background as a FeatureChild', () => {
        const feature = parser.parse(singleBackground)[0].feature
        assert.equal(feature.children.length, 1)
      })

      it('adds the proper attributes to the background', () => {
        const feature = parser.parse(singleBackground)[0].feature
        const background = feature.children[0].background

        assert.equal(background.keyword, 'Background')
        assert.equal(background.name, 'Set up')
        assert.equal(background.description, "Let's do things")
      })

      it('generates proper location for the background', () => {
        const feature = parser.parse(singleBackground)[0].feature
        const background = feature.children[0].background

        assert.strictEqual(background.location.line, 5)
      })

      it('adds the steps to the background', () => {
        const feature = parser.parse(singleBackground)[0].feature
        const background = feature.children[0].background

        assert.deepStrictEqual(
          background.steps.map(step => step.keyword),
          ['Given ', 'And ']
        )

        assert.deepStrictEqual(
          background.steps.map(step => step.text),
          ['things', 'stuff']
        )
      })

      it('generates IDs for the steps', () => {
        const feature = parser.parse(singleBackground)[0].feature
        const step = feature.children[0].background.steps[0]

        assert.notEqual(step.id, '')
      })

      it('generates proper location for the steps', () => {
        const feature = parser.parse(singleBackground)[0].feature
        const step = feature.children[0].background.steps[0]

        assert.strictEqual(step.location.line, 7)
      })

      it('only keeps one background', () => {
        /* When multiple scenarios are ran, the background is repeated */
        const feature = parser.parse(multiBackground)[0].feature
        const backgroundChildren = feature.children.filter(
          child => child.background
        )

        assert.strictEqual(backgroundChildren.length, 1)
        assert.strictEqual(
          backgroundChildren[0].background.name,
          'First background'
        )
      })
    })

    context('with scenarios', () => {
      const scenarioSource = [
        {
          name: 'Attachments',
          description: 'Attachments can be added to steps',
          uri: 'features/attachments/attachments.feature',
          elements: [
            {
              type: 'scenario',
              keyword: 'Scenario',
              name: 'Add attachment',
              description: 'Attachments can be added to the report',
              line: 9,
              steps: [
                {
                  keyword: 'When ',
                  name: 'I attach something',
                },
                {
                  keyword: 'Then ',
                  name: "it's attached",
                },
              ],
            },
          ],
        },
      ]

      it('creates a feature child for the scenarios', () => {
        const feature = parser.parse(scenarioSource)[0].feature
        const scenarios = feature.children.filter(child => child.scenario)

        assert.strictEqual(scenarios.length, 1)
      })

      it('generates IDs for the scenarios', () => {
        const feature = parser.parse(scenarioSource)[0].feature
        const scenarios = feature.children.filter(child => child.scenario)

        assert.notEqual(scenarios[0].scenario.id, '')
      })

      it('generates location for the scenarios', () => {
        const feature = parser.parse(scenarioSource)[0].feature
        const scenarios = feature.children.filter(child => child.scenario)

        assert.strictEqual(scenarios[0].scenario.location.line, 9)
      })

      it('creates a scenarios with the correct properties', () => {
        const feature = parser.parse(scenarioSource)[0].feature
        const scenario = feature.children[0].scenario

        assert.strictEqual(scenario.keyword, 'Scenario')
        assert.strictEqual(scenario.name, 'Add attachment')
        assert.strictEqual(
          scenario.description,
          'Attachments can be added to the report'
        )
      })

      it('adds the steps to the scenario', () => {
        const feature = parser.parse(scenarioSource)[0].feature
        const scenario = feature.children[0].scenario

        assert.deepStrictEqual(
          scenario.steps.map(step => step.keyword),
          ['When ', 'Then ']
        )

        assert.deepStrictEqual(
          scenario.steps.map(step => step.text),
          ['I attach something', "it's attached"]
        )
      })

      context('with hooks', () => {
        const scenarioSource = [
          {
            name: 'Attachments',
            description: 'Attachments can be added to steps',
            uri: 'features/attachments/attachments.feature',
            elements: [
              {
                before: [
                  {
                    match: {
                      location: 'features/hooks/hooks_steps.rb:1',
                    },
                    result: {
                      status: 'passed',
                    },
                  },
                ],
                after: [
                  {
                    match: {
                      location: 'features/hooks/hooks_steps.rb:1',
                    },
                    result: {
                      status: 'passed',
                    },
                  },
                ],
                type: 'scenario',
                keyword: 'Scenario',
                name: 'Add attachment',
                description: 'Attachments can be added to the report',
                line: 9,
              },
            ],
          },
        ]

        it('registers a before Hook in the support code', () => {
          parser.parse(scenarioSource)[0].feature
          assert.equal(supportCode.beforeHooks.length, 1)
        })

        it('registers an after Hook in the support code', () => {
          parser.parse(scenarioSource)[0].feature
          assert.equal(supportCode.afterHooks.length, 1)
        })

        it('produces hooks that execute PassedCodeExecutor', () => {
          const feature = parser.parse(scenarioSource)[0].feature
          const scenario = feature.children[0].scenario
          const pickle = messages.Pickle.create({
            astNodeIds: [scenario.id],
          })
          const beforeHook = supportCode.beforeHooks[0]
          const afterHook = supportCode.afterHooks[0]

          assert.ok(beforeHook.match(pickle) instanceof PassedCodeExecutor)
          assert.ok(afterHook.match(pickle) instanceof PassedCodeExecutor)
        })

        context('and hooks are failing', () => {
          const scenarioSource = [
            {
              name: 'Attachments',
              description: 'Attachments can be added to steps',
              uri: 'features/attachments/attachments.feature',
              elements: [
                {
                  before: [
                    {
                      match: {
                        location: 'features/hooks/hooks_steps.rb:1',
                      },
                      result: {
                        status: 'failed',
                        error_message: 'Ok, something went wrong',
                      },
                    },
                  ],
                  after: [
                    {
                      match: {
                        location: 'features/hooks/hooks_steps.rb:1',
                      },
                      result: {
                        status: 'failed',
                        error_message: 'Something went even wronger',
                      },
                    },
                  ],
                  type: 'scenario',
                  keyword: 'Scenario',
                  name: 'Add attachment',
                  description: 'Attachments can be added to the report',
                  line: 9,
                },
              ],
            },
          ]

          it('produces hooks that execute FailedCodeExecutor', () => {
            const feature = parser.parse(scenarioSource)[0].feature
            const scenario = feature.children[0].scenario
            const pickle = messages.Pickle.create({
              astNodeIds: [scenario.id],
            })
            const beforeHook = supportCode.beforeHooks[0]
            const afterHook = supportCode.afterHooks[0]

            assert.ok(beforeHook.match(pickle) instanceof FailedCodeExecutor)
            assert.ok(afterHook.match(pickle) instanceof FailedCodeExecutor)
          })
        })
      })
    })

    context('step parameters', () => {
      const scenarioSource = [
        {
          name: 'Attachments',
          description: 'Attachments can be added to steps',
          uri: 'features/attachments/attachments.feature',
          elements: [
            {
              type: 'scenario',
              keyword: 'Scenario',
              name: 'Add attachment',
              description: 'Attachments can be added to the report',
              steps: [
                {
                  keyword: 'When ',
                  name: 'I have a doc string',
                  doc_string: {
                    content_type: 'text/plain',
                    value: 'This is some input\nspread on multiple lines',
                  },
                },
                {
                  keyword: 'Then ',
                  name: 'I have a datatable',
                  rows: [
                    {
                      cells: ['username', 'password'],
                    },
                    {
                      cells: ['admin', '@dmin'],
                    },
                    {
                      cells: ['user', 's3cr3t'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]
      let scenario: messages.GherkinDocument.Feature.IScenario

      beforeEach(() => {
        const feature = parser.parse(scenarioSource)[0].feature
        scenario = feature.children[0].scenario
      })

      it('parses doc strings', () => {
        const step = scenario.steps[0]

        assert.strictEqual(step.docString.mediaType, 'text/plain')
        assert.strictEqual(
          step.docString.content,
          'This is some input\nspread on multiple lines'
        )
      })

      it('parses doc strings', () => {
        const step = scenario.steps[1]

        assert.deepStrictEqual(step.dataTable.rows.length, 3)
        assert.deepStrictEqual(
          step.dataTable.rows[0].cells.map(cell => cell.value),
          ['username', 'password']
        )
        assert.deepStrictEqual(
          step.dataTable.rows[1].cells.map(cell => cell.value),
          ['admin', '@dmin']
        )
        assert.deepStrictEqual(
          step.dataTable.rows[2].cells.map(cell => cell.value),
          ['user', 's3cr3t']
        )
      })
    })

    context('parsing steps', () => {
      function makeScenarioWithStepStatus(
        status: string,
        errorMessage?: string
      ): any {
        return {
          elements: [
            {
              type: 'scenario',
              steps: [
                {
                  id: 'step-id',
                  result: {
                    duration: 3971,
                    status: status,
                    error_message: errorMessage,
                  },
                },
              ],
            },
          ],
        }
      }

      function makePickleStep(
        gherkinDocument: messages.IGherkinDocument
      ): messages.Pickle.IPickleStep {
        return messages.Pickle.PickleStep.create({
          astNodeIds: [
            gherkinDocument.feature.children[0].scenario.steps[0].id,
          ],
        })
      }

      context('a passed step', () => {
        it('registers a StepDefinition which returns null upon execution', () => {
          const documents = parser.parse([makeScenarioWithStepStatus('passed')])
          const pickleStep = makePickleStep(documents[0])

          assert.equal(supportCode.stepDefinitions.length, 1)
          assert.equal(
            supportCode.stepDefinitions[0].match(pickleStep).execute(null),
            null
          )
        })
      })

      context('a pending step', () => {
        it('registers a StepDefinition which returns "pending" upon execution', () => {
          const documents = parser.parse([
            makeScenarioWithStepStatus('pending'),
          ])
          const pickleStep = makePickleStep(documents[0])

          assert.equal(supportCode.stepDefinitions.length, 1)
          assert.equal(
            supportCode.stepDefinitions[0].match(pickleStep).execute(null),
            'pending'
          )
        })
      })

      context('a failed step', () => {
        it('registers a StepDefinition which raises an exception upon execution', () => {
          const documents = parser.parse([makeScenarioWithStepStatus('failed')])
          const pickleStep = makePickleStep(documents[0])

          assert.equal(supportCode.stepDefinitions.length, 1)
          assert.throws(() =>
            supportCode.stepDefinitions[0].match(pickleStep).execute(null)
          )
        })

        it('provide the correct stacktrace', () => {
          const stacktrace = [
            'Woops (RuntimeError)',
            './features/statuses/statuses_steps.rb:5:in `"a failed step"',
            "features/statuses/statuses.feature:9:in `a failed step'",
          ].join('\n')
          const documents = parser.parse([
            makeScenarioWithStepStatus('failed', stacktrace),
          ])
          const pickleStep = makePickleStep(documents[0])

          try {
            supportCode.stepDefinitions[0].match(pickleStep).execute(null)
          } catch (err) {
            assert.strictEqual(err.msg, 'Woops (RuntimeError)')
            assert.strictEqual(
              err.stack,
              [
                './features/statuses/statuses_steps.rb:5:in `"a failed step"',
                "features/statuses/statuses.feature:9:in `a failed step'",
              ].join('\n')
            )
          }
        })
      })
    })
  })
})
