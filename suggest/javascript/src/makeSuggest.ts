import { Expression } from '@cucumber/cucumber-expressions'

export type Suggestion = { text: string }

export type Suggest = (text: string) => readonly Suggestion[]

export default function makeSuggest(steps: readonly string[], expressions: readonly Expression[]): Suggest {
  const suggestionSteps: string[] = []
  const sortedSteps = steps.slice().sort()
  for (const expression of expressions) {
    for (const step of sortedSteps) {
      const match = expression.match(step)
      if (match) {
        suggestionSteps.push(step)
        break
      }
    }
  }

  return (text) => {
    return suggestionSteps.map(step => {
      return {
        text: step
      }
    })
  }
}
