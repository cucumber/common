import assert from 'assert'
import Step from '../src/Step'
import DocString from '../src/DocString'

describe('Step', () => {
  context('contentByLineNumber', () => {
    it('returns a hash with content for each line for rendering', () => {
      const step = new Step(12, 'Given ', 'something')

      assert.deepStrictEqual(
        step.contentByLineNumber(),
        new Map([[12, '    Given something']])
      )
    })

    it('returns lines from the DocString if provided', () => {
      const step = new Step(
        12,
        'Given ',
        'something',
        new DocString(
          13,
          'markdown',
          '# A title\nsome content'
        ))

      assert.deepStrictEqual(
        step.contentByLineNumber(),
        new Map([
          [12, '    Given something'],
          [13, '      ```markdown'],
          [14, '      # A title'],
          [15, '      some content'],
          [16, '      ```']
        ])
      )
    })
  })
})
