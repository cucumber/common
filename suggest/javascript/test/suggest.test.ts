import assert from 'assert'
import { Suggestion } from '../src/makeSuggest'

function suggest(text: string): readonly Suggestion[] {
  return [{
    text: 'I have 42 cukes in my belly'
  }]
}

describe('suggest', () => {
  it('suggests an existing step', () => {
    const suggestions = suggest('I have')
    const expectedSuggestion: Suggestion = {
      text: 'I have 42 cukes in my belly'
    }
    assert.deepStrictEqual(suggestions, [expectedSuggestion])
  })
})
