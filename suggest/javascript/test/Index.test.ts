import assert from 'assert'
import bruteForceIndex from './bruteForceIndex'
import { Index, StepDocument } from '../src'
import fuseIndex from './fuseIndex'
import jsSearchIndex from './jsSearchIndex'
import * as txtgen from 'txtgen'

type BuildIndex = (permutationExpressions: readonly StepDocument[]) => Index

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

    describe('performance / fuzz', () => {
      it('matches how quickly exactly?', () => {
        for (let i = 0; i < 100; i++) {
          const length = 100
          const expressions: StepDocument[] = Array(length)
            .fill(0)
            .map(() => [txtgen.sentence()])
          const index = buildIndex(expressions)

          const sentence = expressions[Math.floor(length / 2)][0] as string
          const words = sentence.split(' ')
          // Find a word longer than 5 letters (fall back to the middle word if there are none)
          const word = words.find((word) => word.length > 5) || words[Math.floor(words.length / 2)]
          const term = word.replace(/[.?!;,]/g, '').toLowerCase()

          const suggestions = index(term)
          if (suggestions.length === 0) {
            console.error(`WARNING: ${name} - no hits for "${term}"`)
          }
          for (const suggestion of suggestions) {
            const s = (suggestion[0] as string).toLowerCase()
            if (!s.includes(term)) {
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
