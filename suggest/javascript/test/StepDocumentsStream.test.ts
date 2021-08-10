import { pipeline as pipelineCb, Writable } from 'stream'
import { promisify } from 'util'
import fs from 'fs'
import { NdjsonToMessageStream } from '@cucumber/message-streams'
import { StepDocument } from '../src/types'
import assert from 'assert'
import StepDocumentsStream from '../src/StepDocumentsStream'

const pipeline = promisify(pipelineCb)

describe('StepDocumentsStream', () => {
  it('builds a StepDocuments array from a message stream', async () => {
    const readStream = fs.createReadStream(__dirname + '/fixtures/messages.ndjson', 'utf-8')
    let stepDocuments: StepDocument[]
    await pipeline(
      readStream,
      new NdjsonToMessageStream(),
      new StepDocumentsStream(),
      new Writable({
        objectMode: true,
        write(_stepDocuments: StepDocument[], encoding, callback) {
          stepDocuments = _stepDocuments
          callback()
        }
      })
    )
    const expectedStepDocuments: StepDocument[] = [
      {
        'segments': [
          'Lucy is at ',
          [
            '0',
            '800',
            '900',
          ],
          ', ',
          [
            '0',
            '800',
            '900',
          ]
        ],
        'suggestion': 'Lucy is at {int}, {int}',
      },
      {
        'segments': [
          'Lucy should hear Sean'
        ],
        'suggestion': 'Lucy should hear Sean',
      },
      {
        'segments': [
          'Lucy should hear nothing'
        ],
        'suggestion': 'Lucy should hear nothing',
      },
      {
        'segments': [
          'Sean is at ',
          [
            '0',
            '800',
            '900',
          ],
          ', ',
          [
            '0',
            '800',
            '900',
          ],
        ],
        'suggestion': 'Sean is at {int}, {int}',
      },
      {
        'segments': [
          'Sean shouts'
        ],
        'suggestion': 'Sean shouts'
      }
    ]
    assert.deepStrictEqual(stepDocuments, expectedStepDocuments)
  })

  it('builds a StepDocuments array from a message stream with parameter types', async () => {
    const readStream = fs.createReadStream(__dirname + '/fixtures/suggest.ndjson', 'utf-8')
    let stepDocuments: StepDocument[]
    await pipeline(
      readStream,
      new NdjsonToMessageStream(),
      new StepDocumentsStream(),
      new Writable({
        objectMode: true,
        write(_stepDocuments: StepDocument[], encoding, callback) {
          stepDocuments = _stepDocuments
          callback()
        }
      })
    )
    const expectedStepDocuments: StepDocument[] = [
      {
        'segments': [
          'I select the ',
          [
            '2nd'
          ],
          ' snippet'
        ],
        'suggestion': 'I select the {ordinal} snippet'
      },
      {
        'segments': [
          'I type ',
          [
            '"I have ${1|11,17,23|} cukes on my ${2|belly,table,tree|}"',
            '"cukes"'
          ]
        ],
        'suggestion': 'I type {string}'
      },
      {
        'segments': [
          'the LSP snippet should be ',
          [
            '"I have ${1|11,17,23|} cukes on my ${2|belly,table,tree|}"',
            '"cukes"'
          ],
        ],
        'suggestion': 'the LSP snippet should be {string}'
      },
      {
        'segments': [
          'the following Gherkin step texts exist:'
        ],
        'suggestion': 'the following Gherkin step texts exist:'
      },
      {
        'segments': [
          'the following Step Definitions exist:'
        ],
        'suggestion': 'the following Step Definitions exist:'
      },
      {
        'segments': [
          'the suggestions should be empty'
        ],
        'suggestion': 'the suggestions should be empty'
      },
      {
        'segments': [
          'the suggestions should be:'
        ],
        'suggestion': 'the suggestions should be:'
      }
    ]
    assert.deepStrictEqual(stepDocuments, expectedStepDocuments)
  })
})
