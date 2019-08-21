import { ResultsLookup } from './types'
import * as React from 'react'

const defaultResultsLookup: ResultsLookup = (
  queryUri: string,
  queryLine: number,
) => []
const ResultsLookupContext: React.Context<ResultsLookup> = React.createContext(defaultResultsLookup)

export default ResultsLookupContext
