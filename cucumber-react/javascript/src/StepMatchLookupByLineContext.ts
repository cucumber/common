import { StepMatchLookupByLine } from './types'
import React from 'react'

const defaultStepMatchLookup: StepMatchLookupByLine = (
  queryLine: number,
) => []
const StepMatchLookupByLineContext: React.Context<StepMatchLookupByLine> = React.createContext(defaultStepMatchLookup)

export default StepMatchLookupByLineContext
