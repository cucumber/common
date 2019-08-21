import { ResultsLookup } from './types'
import * as React from 'react'

const defaultResultsLookup: ResultsLookup = (
  queryUri: string,
  queryLine: number,
) => []
const GherkinDocumentContext: React.Context<ResultsLookup> = React.createContext(defaultResultsLookup)

export default GherkinDocumentContext
