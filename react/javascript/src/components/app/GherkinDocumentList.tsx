import React from 'react'
import GherkinDocument from '../gherkin/GherkinDocument'
import { messages } from '@cucumber/messages'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import CucumberQueryContext from '../../CucumberQueryContext'
import CucumberQuery from '@cucumber/query'
import UriContext from '../../UriContext'
import statusColor from '../gherkin/statusColor'

interface IProps {
  gherkinDocuments: messages.IGherkinDocument[]
  cucumberQuery: CucumberQuery
}

const GherkinDocumentList: React.FunctionComponent<IProps> = ({
  gherkinDocuments,
  cucumberQuery,
}) => {
  return (
    <div className="gherkin-document-list">
      <CucumberQueryContext.Provider value={cucumberQuery}>
        <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
          {gherkinDocuments.map(gherkinDocument => {
            const testResults = cucumberQuery.getDocumentResults(
              gherkinDocument.uri
            )
            const status =
              testResults.length > 0
                ? testResults[0].status
                : messages.TestResult.Status.UNKNOWN

            return (
              <AccordionItem
                key={gherkinDocument.uri}
                uuid={gherkinDocument.uri}
              >
                <AccordionItemHeading>
                  <AccordionItemButton
                    style={{ backgroundColor: statusColor(status).hex() }}
                  >
                    {gherkinDocument.uri}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <UriContext.Provider value={gherkinDocument.uri}>
                    <GherkinDocument gherkinDocument={gherkinDocument} />
                  </UriContext.Provider>
                </AccordionItemPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      </CucumberQueryContext.Provider>
    </div>
  )
}

export default GherkinDocumentList
