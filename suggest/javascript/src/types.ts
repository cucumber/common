/**
 * A search index function.
 *
 * @param text a text to search for
 * @return results in the form of permutation expressions
 */
export type Index = (text: string) => readonly StepDocument[]

/**
 * A document that can be indexed.
 */
export type StepDocument = readonly StepSegment[]

export type StepSegment = string | readonly string[]
