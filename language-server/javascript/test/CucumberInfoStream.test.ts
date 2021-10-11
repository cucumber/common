import { pipeline as pipelineCb, Writable } from 'stream'
import { promisify } from 'util'
import fs from 'fs'
import { NdjsonToMessageStream } from '@cucumber/message-streams'
import assert from 'assert'
import { StepDocument } from '@cucumber/suggest'
import { CucumberInfoStream } from '../src/CucumberInfoStream'
import { CucumberInfo } from '@cucumber/language-service'

const pipeline = promisify(pipelineCb)

describe('CucumberInfoStream', () => {
  it('builds CucumberInfo from a message stream with parameter types', async () => {
    const readStream = fs.createReadStream(__dirname + '/fixtures/suggest.ndjson', 'utf-8')
    let cucumberInfo: CucumberInfo
    await pipeline(
      readStream,
      new NdjsonToMessageStream(),
      new CucumberInfoStream(),
      new Writable({
        objectMode: true,
        write(_cucumberInfo: CucumberInfo, encoding, callback) {
          cucumberInfo = _cucumberInfo
          callback()
        },
      })
    )
    const expectedStepDocuments: Partial<StepDocument>[] = [
      {
        segments: ['I select the ', ['2nd'], ' snippet'],
        suggestion: 'I select the {ordinal} snippet',
      },
      {
        segments: [
          'I type ',
          ['"I have ${1|11,17,23|} cukes on my ${2|belly,table,tree|}"', '"cukes"'],
        ],
        suggestion: 'I type {string}',
      },
      {
        segments: [
          'the LSP snippet should be ',
          ['"I have ${1|11,17,23|} cukes on my ${2|belly,table,tree|}"', '"cukes"'],
        ],
        suggestion: 'the LSP snippet should be {string}',
      },
      {
        segments: ['the following Gherkin step texts exist:'],
        suggestion: 'the following Gherkin step texts exist:',
      },
      {
        segments: ['the following Step Definitions exist:'],
        suggestion: 'the following Step Definitions exist:',
      },
      {
        segments: ['the suggestions should be empty'],
        suggestion: 'the suggestions should be empty',
      },
      {
        segments: ['the suggestions should be:'],
        suggestion: 'the suggestions should be:',
      },
    ]
    assert.deepStrictEqual(cucumberInfo.stepDocuments.map(d => ({segments: d.segments, suggestion: d.suggestion})), expectedStepDocuments)

    const expectedExpressionSources = [
      'the following Gherkin step texts exist:',
      'the following Step Definitions exist:',
      'I type {string}',
      'I select the {ordinal} snippet',
      'the suggestions should be:',
      'the suggestions should be empty',
      'the LSP snippet should be {string}',
    ]
    assert.deepStrictEqual(
      cucumberInfo.expressions.map((e) => e.source),
      expectedExpressionSources
    )
  })
})
