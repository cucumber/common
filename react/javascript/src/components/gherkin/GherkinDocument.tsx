import React from 'react'
import { Feature } from './Feature'
import { GherkinDocumentProps, useCustomRendering } from '../customise'

const DefaultRenderer: React.FunctionComponent<GherkinDocumentProps> = ({ gherkinDocument }) => {
  return gherkinDocument.feature ? <Feature feature={gherkinDocument.feature} /> : null
}

export const GherkinDocument: React.FunctionComponent<GherkinDocumentProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<GherkinDocumentProps, {}>(
    'GherkinDocument',
    {},
    DefaultRenderer
  )
  return <ResolvedRenderer {...props} />
}
