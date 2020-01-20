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
import UriContext from '../../UriContext'
import statusColor from '../gherkin/statusColor'
import GherkinQueryContext from '../../GherkinQueryContext'
import TestResultQueryContext from '../../TestResultsQueryContext'

const GherkinDocumentList: React.FunctionComponent = () => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const testResultsQuery = React.useContext(TestResultQueryContext)

  return (
    <div className="gherkin-document-list">
      <Accordion
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        preExpanded={gherkinQuery.getGherkinDocuments().map(doc => doc.uri)}
      >
        {gherkinQuery.getGherkinDocuments().map(gherkinDocument => {
          const gherkinDocumentStatus = gherkinDocument.feature
            ? testResultsQuery.getWorstResult(
                testResultsQuery.getPickleResults(
                  gherkinQuery.getPickleIds(gherkinDocument.uri)
                )
              ).status
            : messages.TestResult.Status.UNDEFINED

          return (
            <AccordionItem key={gherkinDocument.uri} uuid={gherkinDocument.uri}>
              <AccordionItemHeading>
                <AccordionItemButton
                  style={{
                    backgroundColor: statusColor(gherkinDocumentStatus).hex(),
                  }}
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
    </div>
  )
}

export default GherkinDocumentList
