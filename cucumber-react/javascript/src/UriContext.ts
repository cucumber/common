import { ResultsLookup } from './types'
import * as React from 'react'

const UriContext: React.Context<string> = React.createContext('unknown.feature')

export default UriContext
