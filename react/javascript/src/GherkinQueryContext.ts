import React from 'react'
import { GherkinQuery } from '@cucumber/gherkin'

export default React.createContext(new GherkinQuery())
