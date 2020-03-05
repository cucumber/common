import React from 'react'
import { Query as GherkinQuery } from '@cucumber/gherkin'

export default React.createContext(new GherkinQuery())
