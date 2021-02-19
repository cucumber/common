import * as assert from 'assert'
import GherkinLine from '../src/GherkinLine'

describe('GherkinLine', () => {
  describe('#getTableCells', () => {
    function getCellsText(line: string) {
      const gl = new GherkinLine(line, 1)

      return gl.getTableCells().map((span) => span.text)
    }

    it('trims white spaces before cell content', () => {
      assert.deepStrictEqual(getCellsText('|   \t spaces before|'), [
        'spaces before',
      ])
    })

    it('trims white spaces after cell content', () => {
      assert.deepStrictEqual(getCellsText('|spaces after   |'), [
        'spaces after',
      ])
    })

    it('trims white spaces around cell content', () => {
      assert.deepStrictEqual(getCellsText('|   \t spaces everywhere   \t|'), [
        'spaces everywhere',
      ])
    })

    it('does not delete white spaces inside a cell', () => {
      assert.deepStrictEqual(getCellsText('| foo()\n  bar\nbaz |'), [
        'foo()\n  bar\nbaz',
      ])
    })
  })
})
