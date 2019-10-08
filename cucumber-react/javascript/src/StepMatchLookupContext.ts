import { StepMatchLookup } from './types'
import React from 'react'

const defaultStepMatchLookup: StepMatchLookup = (
  queryUri: string,
  queryLine: number,
) => []
const StepMatchLookupContext: React.Context<StepMatchLookup> = React.createContext(defaultStepMatchLookup)

export default StepMatchLookupContext
