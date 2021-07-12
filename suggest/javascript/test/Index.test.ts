import assert from 'assert'
import bruteForceIndex from '../src/bruteForceIndex'

describe('Index', () => {
  it('matches', () => {
    let exp1 = ['I have ', ['42', '98'], ' cukes in my belly']
    const index = bruteForceIndex([exp1])
    const suggestions = index('I have')
    assert.deepStrictEqual(suggestions, [exp1])
  })
})
