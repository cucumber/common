/**
 * A search index function.
 *
 * @param text a text to search for
 * @return results in the form of step documents
 */
export type Index = (text: string) => readonly StepDocument[]

/**
 * A document that can be indexed. It's recommended to index the segments rather than the suggestion.
 * When indexing the segments, the nested arrays (representing choices) may be given lower weight
 * than the string segments (which represent the "sentence")
 */
export type StepDocument = {
  /**
   * The suggestion is what the user will see in the autocomplete.
   */
  suggestion: string

  /**
   * The segments are used to build the contents that will be inserted into the editor
   * after selecting a suggestion.
   *
   * For LSP compatible editors, this can be formatted to an LSP snippet with the
   * lspCompletionSnippet function.
   */
  segments: StepSegments
}

export type StepSegments = readonly StepSegment[]

export type StepSegment = string | readonly string[]
