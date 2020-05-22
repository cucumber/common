import DataTable from '../src/DataTable'
import assert from 'assert'

describe('DataTable', () => {
  it('can be transposed', () => {
    const o = new DataTable([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['4', '5', '6'],
    ])
    const t = o.transpose()
    assert.deepStrictEqual(t.raw, [
      ['a', '1', '4'],
      ['b', '2', '5'],
      ['c', '3', '6'],
    ])
  })

  it('does not throw an error when diffed with an identical table', () => {
    const t = new DataTable([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['4', '5', '6'],
    ])
    t.diff(t)
  })

  it('throws an error when diffed with a different table', () => {
    const t = new DataTable([
      ['a', 'b', 'c'],
      ['1', '2', 'X'],
      ['4', '5', '6'],
    ])
    t.diff(t)
  })
})
