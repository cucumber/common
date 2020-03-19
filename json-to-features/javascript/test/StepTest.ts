import assert from 'assert'
import Step from '../src/Step'
import DocString from '../src/DocString'
import DataTable from '../src/DataTable'

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
        new DocString(13, 'markdown', '# A title\nsome content')
      )

      assert.deepStrictEqual(
        step.contentByLineNumber(),
        new Map([
          [12, '    Given something'],
          [13, '      ```markdown'],
          [14, '      # A title'],
          [15, '      some content'],
          [16, '      ```'],
        ])
      )
    })

    it('returns lines from the DataTable if provided', () => {
      const step = new Step(
        12,
        'Given ',
        'something',
        null,
        new DataTable(13, [
          ['username', 'twitter', 'lastLogin'],
          ['joe', '@joe', ''],
          ['the-one-with-a-long-username', '@towalu', '2020-3-19-16:25'],
        ])
      )

      assert.deepStrictEqual(
        step.contentByLineNumber(),
        new Map([
          [12, '    Given something'],
          [
            13,
            '      | username                     | twitter | lastLogin       |',
          ],
          [
            14,
            '      | joe                          | @joe    |                 |',
          ],
          [
            15,
            '      | the-one-with-a-long-username | @towalu | 2020-3-19-16:25 |',
          ],
        ])
      )
    })
  })
})
