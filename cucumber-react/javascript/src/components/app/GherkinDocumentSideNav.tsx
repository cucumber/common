import { messages } from 'cucumber-messages'
import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
} from '../styled-react-accessible-accordion'
import CucumberQueryContext from '../../CucumberQueryContext'

interface IGherkinDocumentNavProps {
  gherkinDocuments: messages.IGherkinDocument[]
  selectedUri: string,
  onSelection: (uri: string) => void
}

const GherkinDocumentSideNav: React.FunctionComponent<IGherkinDocumentNavProps> = ({ gherkinDocuments, selectedUri, onSelection }) => {
  const cucumberQuery = React.useContext(CucumberQueryContext)
  return (
    <Accordion
      allowMultipleExpanded={false}
      allowZeroExpanded={false}
      preExpanded={[selectedUri]}
      onChange={(args: string[]): void => onSelection(args[0])}
    >
      {gherkinDocuments.map(gherkinDocument => {
        const testResults = cucumberQuery.getDocumentResults(gherkinDocument.uri)
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
