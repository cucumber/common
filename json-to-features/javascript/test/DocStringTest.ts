import assert from 'assert'
import DocString from '../src/DocString'

describe('DocString', () => {
  context('contentByLineNumber', () => {
    it('returns the content by line', () => {
      const docString = new DocString(
        12,
        '',
        'This is some input\nspread on multiple lines'
      )
      assert.deepStrictEqual(
        docString.contentByLineNumber(),
        new Map([
          [12, '      """'],
          [13, '      This is some input'],
          [14, '      spread on multiple lines'],
          [15, '      """'],
        ])
      )
    })

    it('uses backticks when a content-type is set', () => {
      const docString = new DocString(
        12,
        'ruby',
        'This is some input\nspread on multiple lines'
      )
      assert.deepStrictEqual(
        docString.contentByLineNumber(),
        new Map([
          [12, '      ```ruby'],
          [13, '      This is some input'],
          [14, '      spread on multiple lines'],
          [15, '      ```'],
        ])
      )
    })
  })
})
