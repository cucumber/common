import { ResultsLookupByLine } from './types'
import React from 'react'

const defaultResultsLookup: ResultsLookupByLine = (
  queryLine: number,
) => []
const ResultsLookupByLineContext: React.Context<ResultsLookupByLine> = React.createContext(defaultResultsLookup)

export default ResultsLookupByLineContext
