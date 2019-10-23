import * as assert from 'assert'
import GherkinLine from '../src/GherkinLine'

describe('GherkinLine', function() {
  function getCellsText(line: string) {
    const gl = new GherkinLine(line, 1)

    return gl.getTableCells().map(span => span.text)
  }

  it('getTableCells correctly trims cells content', function() {
    assert.deepEqual(getCellsText("|spaces after   |"), ['spaces after'])
    assert.deepEqual(getCellsText("|   \t spaces before|"), ['spaces before'])
    assert.deepEqual(getCellsText("|   \t spaces everywhere   \t|"), ['spaces everywhere'])
  })

  it('getTableCells does not drop white spaces inside a cell', function() {
    assert.deepEqual(getCellsText("| foo()\n  bar\nbaz |"), ['foo()\n  bar\nbaz'])
  })
})