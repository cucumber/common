import React from 'react'
import CucumberQuery from '@cucumber/query'
import { GherkinQuery } from '@cucumber/gherkin'

export default React.createContext(new CucumberQuery(new GherkinQuery()))
