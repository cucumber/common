import React from 'react'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'

export default React.createContext(new GherkinQuery())
