import { render } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import UriContext from '../../src/UriContext'
import CucumberQueryContext from '../../src/CucumberQueryContext'
import GherkinQueryContext from '../../src/GherkinQueryContext'

export interface TestRenderOptions {
  uri?: string
  gherkinQuery?: GherkinQuery
  cucumberQuery?: CucumberQuery
}

const AllTheProviders: React.FunctionComponent<{ options: TestRenderOptions }> = ({
  children,
  options,
}) => {
  return (
    <GherkinQueryContext.Provider value={options.gherkinQuery}>
      <UriContext.Provider value={options.uri}>
        <CucumberQueryContext.Provider value={options.cucumberQuery}>
          {children}
        </CucumberQueryContext.Provider>
      </UriContext.Provider>
    </GherkinQueryContext.Provider>
  )
}

const customRender = (ui: ReactElement, options?: Partial<TestRenderOptions>) => {
  const mergedOptions: TestRenderOptions = Object.assign(
    {
      uri: 'some.feature',
      gherkinQuery: new GherkinQuery(),
      cucumberQuery: new CucumberQuery(),
    },
    options
  )
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders options={mergedOptions}>{children}</AllTheProviders>
    ),
  })
}

export * from '@testing-library/react'

export { customRender as render }
