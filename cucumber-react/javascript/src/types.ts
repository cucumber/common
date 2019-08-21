import { messages } from 'cucumber-messages'

/**
 * Looks up test results for a uri and an optional line number. Results are sorted, so the most
 * significant result is at index 0. Significance is determined by the ordinal value of the Status enum
 * (higher ordinal is more significant).
 */
export type ResultsLookup = (
  queryUri: string,
  queryLine: number | null,
) => messages.ITestResult[]

export type ResultsLookupByLine = (
  queryLine: number | null,
) => messages.ITestResult[]
