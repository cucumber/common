import { messages } from 'cucumber-messages'
import React from 'react'
import ResultsLookupContext from '../../ResultsLookupContext'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
} from '../styled-react-accessible-accordion'

interface IGherkinDocumentNavProps {
  gherkinDocuments: messages.IGherkinDocument[]
  selectedUri: string,
  onSelection: (uri: string) => void
}

const GherkinDocumentSideNav: React.FunctionComponent<IGherkinDocumentNavProps> = ({ gherkinDocuments, selectedUri, onSelection }) => {
  const resultsLookup = React.useContext(ResultsLookupContext)
  return (
    <Accordion
      allowMultipleExpanded={false}
      allowZeroExpanded={false}
      preExpanded={[selectedUri]}
      onChange={(args: string[]): void => onSelection(args[0])}
    >
      {gherkinDocuments.map(gherkinDocument => {
        const testResults = resultsLookup(gherkinDocument.uri, null)
        const status = testResults.length > 0 ? testResults[0].status : messages.TestResult.Status.UNKNOWN

        return (
          <AccordionItem
            key={gherkinDocument.uri}
            uuid={gherkinDocument.uri}
          >
            <AccordionItemHeading>
              <AccordionItemButton status={status}>
                {gherkinDocument.uri}
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default GherkinDocumentSideNav
