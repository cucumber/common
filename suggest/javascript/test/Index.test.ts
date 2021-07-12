import assert from 'assert'
import bruteForceIndex from '../src/bruteForceIndex'
import { Index, PermutationExpression } from '../src/types'
import fuseIndex from './fuseIndex'
import jsSearchIndex from './jsSearchIndex'
import * as txtgen from 'txtgen'

type BuildIndex = (permutationExpressions: readonly PermutationExpression[]) => Index

function verifyIndexContract(name: string, buildIndex: BuildIndex) {
  describe(name, () => {
    describe('basics', () => {
      const exp1 = ['I have ', ['42', '98'], ' cukes in my belly']
      const exp2 = ['I am a teapot']
      let index: Index
      beforeEach(() => {
        index = buildIndex([exp1, exp2])
      })

      it('matches two words in the beginning of an expression', () => {
        const suggestions = index('have')
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

    describe('performance', () => {
      it('matches how quickly exactly?', () => {
        for (let i = 0; i < 100; i++) {
          const length = 100
          const expressions: PermutationExpression[] = Array(length).fill(0).map(() => [txtgen.sentence()])
          const index = buildIndex(expressions)

          const sentence = expressions[Math.floor(length/2)][0] as string
          const words = sentence.split(' ')
          // Find a word longer than 5 letters (fall back to the middle word if there are none)
          const term = words.find(word => word.length > 5) || words[Math.floor(words.length / 2)]

          const suggestions = index(term)
          assert(suggestions.length > 0)
          for (const suggestion of suggestions) {
            const s = expressions[Math.floor(length/2)][0] as string
            if(!s.includes(term)) {
              console.error(`WARNING: ${name} - "${s}" does not include "${term}"`)
            }
          }
        }
      })
    })
  })
}

verifyIndexContract('bruteForceIndex', bruteForceIndex)
verifyIndexContract('fuseIndex', fuseIndex)
verifyIndexContract('jsSearchIndex', jsSearchIndex)
