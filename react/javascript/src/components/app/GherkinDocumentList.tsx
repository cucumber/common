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

interface IProps {
  gherkinDocuments: messages.IGherkinDocument[]
}

const GherkinDocumentList: React.FunctionComponent<IProps> = ({
  gherkinDocuments,
}) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const testResultsQuery = React.useContext(TestResultQueryContext)

  return (
    <div className="gherkin-document-list">
      <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
        {gherkinDocuments.map(gherkinDocument => {
          console.log("--pickle ids---", gherkinQuery.getPickleIds(gherkinDocument.uri))
          const gherkinDocumentResult = testResultsQuery.getWorstResult(
            testResultsQuery.getAllPickleResults(
              gherkinQuery.getPickleIds(gherkinDocument.uri)
            )
          )

          return (
            <AccordionItem key={gherkinDocument.uri} uuid={gherkinDocument.uri}>
              <AccordionItemHeading>
                <AccordionItemButton
                  style={{
                    backgroundColor: statusColor(
                      gherkinDocumentResult.status
                    ).hex(),
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
