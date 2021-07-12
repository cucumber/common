import assert from 'assert'
import bruteForceIndex from '../src/bruteForceIndex'
import { Index, PermutationExpression } from '../src/types'

type BuildIndex = (permutationExpressions: readonly PermutationExpression[]) => Index

function verifyIndexContract(name: string, buildIndex: BuildIndex) {
  describe(name, () => {
    it('matches the beginning of an expression', () => {
      let exp1 = ['I have ', ['42', '98'], ' cukes in my belly']
      let exp2 = ['I am a teapot']
      const index = buildIndex([exp1, exp2])
      const suggestions = index('I have')
      assert.deepStrictEqual(suggestions, [exp1])
    })

    it('matches a word in an expression', () => {
      let exp1 = ['I have ', ['42', '98'], ' cukes in my belly']
      let exp2 = ['I am a teapot']
      const index = buildIndex([exp1, exp2])
      const suggestions = index('cukes')
      assert.deepStrictEqual(suggestions, [exp1])
    })

    it('matches a word in an choice', () => {
      let exp1 = ['I have ', ['42', '98'], ' cukes in my belly']
      let exp2 = ['I am a teapot']
      const index = buildIndex([exp1, exp2])
      const suggestions = index('98')
      assert.deepStrictEqual(suggestions, [exp1])
    })
  })
}

verifyIndexContract('bruteForceIndex', (expressions) => bruteForceIndex(expressions))
// TODO: Add a more performant index
