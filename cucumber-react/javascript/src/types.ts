import { messages } from 'cucumber-messages'

export type ResultsLookup = (
  queryUri: string,
  queryLine: number
) => messages.ITestResult[]
