export type Suggestion = { text: string }

export type Suggest = (text: string) => readonly Suggestion[]

export default function makeSuggest(steps: readonly string[]): Suggest {
  return (text) => {
    return steps.map(step => {
      return {
        text: step
      }
    })
  }
}
