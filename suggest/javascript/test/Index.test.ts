import assert from 'assert'
import bruteForceIndex from '../src/bruteForceIndex'
import { Index, PermutationExpression } from '../src/types'
import fuseIndex from './fuseIndex'
import jsSearchIndex from './jsSearchIndex'

type BuildIndex = (permutationExpressions: readonly PermutationExpression[]) => Index

function verifyIndexContract(name: string, buildIndex: BuildIndex) {
  describe(name, () => {
    const exp1 = ['I have ', ['42', '98'], ' cukes in my belly']
    const exp2 = ['I am a teapot']
    let index: Index
    beforeEach(() => {
      index = buildIndex([exp1, exp2])
    })

    it('matches two words in the beginning of an expression', () => {
      const suggestions = index('I have')
      assert.deepStrictEqual(suggestions, [exp1])
    })

    it('matches a word in an expression', () => {
      const suggestions = index('cukes')
      assert.deepStrictEqual(suggestions, [exp1])
    })

    it('matches a word in a choice', () => {
      const suggestions = index('98')
      assert.deepStrictEqual(suggestions, [exp1])
    })

    it('matches nothing', () => {
      const suggestions = index('nope')
      assert.deepStrictEqual(suggestions, [])
    })
  })
}

verifyIndexContract('bruteForceIndex', bruteForceIndex)
verifyIndexContract('fuseIndex', fuseIndex)
verifyIndexContract('jsSearchIndex', jsSearchIndex)
