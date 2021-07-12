/**
 * A search index function. Results can be formatted with {@link lspSnippet} for use in LSP systems.
 *
 * @param text a text to search for
 * @return results in the form of permutation expressions
 */
export type Index = (text: string) => readonly PermutationExpression[]

/**
 * Represents variation of a sentence.
 */
export type PermutationExpression = readonly PermutationSegment[]

export type PermutationSegment = string | readonly string[]
