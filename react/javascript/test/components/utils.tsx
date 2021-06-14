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
    <GherkinQueryContext.Provider value={options.gherkinQuery ?? new GherkinQuery()}>
      <UriContext.Provider value={options.uri ?? 'some.feature'}>
        <CucumberQueryContext.Provider value={options.cucumberQuery ?? new CucumberQuery()}>
          {children}
        </CucumberQueryContext.Provider>
      </UriContext.Provider>
    </GherkinQueryContext.Provider>
  )
}

const customRender = (ui: ReactElement, options: Partial<TestRenderOptions> = {}) => {
  const WrappedWithOptions: React.FunctionComponent = ({ children }) => (
    <AllTheProviders options={options}>{children}</AllTheProviders>
  )
  return render(ui, { wrapper: WrappedWithOptions })
}

export * from '@testing-library/react'

export { customRender as render }
